//    Copyright 2016 Yoshi Yamaguchi
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

// This sample is TypeScript ported version of https://github.com/firebase/quickstart-js.

/// <reference path="../../../node_modules/firebase/app.d.ts" />
/// <reference path="../../../node_modules/firebase/firebase.d.ts" />

import * as firebase from 'firebase';

const config = {
    apiKey: "<apiKey>",
    authDomain: "<domain>",
    databaseURL: "<database URL>",
    storageBucket: "<storage bucket>"
};

firebase.initializeApp(config);
document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
document.getElementById('sign-up').addEventListener('click', handleSignUp, false);

function toggleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        const email = (<HTMLInputElement>document.getElementById('email')).value;
        const password = (<HTMLInputElement>document.getElementById('password')).value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((e) => {
            const code = e.code;
            const message = e.message;

            switch (code) {
                case 'auth/wrong-password':
                    alert('Wrong password');
                    break;
                default:
                    alert(message);
                    break;
            }
            console.log(e);
            (<HTMLInputElement>document.getElementById('sign-in')).disabled = true;
        });
    }
}

function handleSignUp() {
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((e) => {
        const code = e.code;
        const message = e.message;
        switch (code) {
            case 'auth/weak-password':
                alert('The password is too weak.')
                break;
            default:
                alert(message);
                break;
        }
        console.log(e);
    })
};

// port initApp()
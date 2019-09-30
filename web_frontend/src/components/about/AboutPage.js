import React from 'react';

export function AboutPage(props) {
    return (
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1>About</h1>
                    <p>Test application using the following services and technologies:</p>
                    <dl>
                        <dt>Front end</dt>
                        <dd>React</dd>

                        <dt>Back end</dt>
                        <dd>Google App Engine, Flask</dd>

                        <dt>Persistence</dt>
                        <dd>Firestore</dd>

                        <dt>Search</dt>
                        <dd>Algolia</dd>

                        <dt>Plumbing</dt>
                        <dd>Google Cloud Functions</dd>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default AboutPage
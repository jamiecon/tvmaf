import React from 'react';

function AboutPage(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>About</h1>
                    <p>Test application using the following services and technologies:</p>
                    <dl>
                        <dt>Front end</dt>
                        <dd>React</dd>

                        <dt>Back end</dt>
                        <dd>Firestore</dd>

                        <dt>Search</dt>
                        <dd>Algolia</dd>

                        <dt>Plumbing</dt>
                        <dd>Google Cloud Functions</dd>

                        <dt>Hosting</dt>
                        <dd>Google App Engine</dd>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default AboutPage
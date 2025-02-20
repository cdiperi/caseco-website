import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <section className="mb-12">
                <h1 className="text-3xl font-bold mb-6">About CASECO, Inc.</h1>

                <div className="space-y-6">
                    <p className="text-lg">
                        <span className="font-bold text-red-600">CASECO</span> is the exclusive
                        agent for high quality product lines focusing on safe automation in the
                        industrial workplace. One of the aims of{' '}
                        <span className="font-bold text-red-600">CASECO</span> is to improve
                        productivity while implementing current safety requirements.{' '}
                        <span className="font-bold text-red-600">CASECO</span> can provide
                        solutions either as a total package solution or simply provide an
                        elemental solution to a particular issue.
                    </p>

                    <p className="text-lg">
                        <span className="font-bold text-red-600">CASECO</span> is dedicated
                        to providing its customers with unique, high quality solutions.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Management</h2>

                <div className="space-y-6">
                    <p className="text-lg">
                        The company is owned and operated by{' '}
                        <a
                            href="mailto:timdiperi@caseco-inc.com"
                            className="text-blue-600 hover:underline"
                        >
                            Tim DiPeri
                        </a>
                        , an Electrical Engineer with a long history of developing creative
                        solutions to address his clients' problems.
                    </p>

                    <p className="text-lg">
                        He is a pilot with a commercial rating and competes nationally in
                        radio controlled helicopter skill events.
                    </p>

                    <p className="text-lg">
                        In his off time he enjoys sports activities and participating in a
                        number of community service activities, including being an active
                        board member of his church ministry. He is a father of three and
                        enjoys spending quality time with his wife and children.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
import { useState } from "react";

import { checkSymptoms } from "../services/api";


function SymptomChecker() {

    const [symptoms, setSymptoms] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [error, setError] = useState("");


    const handleCheckSymptoms = async () => {

        if (!symptoms.trim()) {

            setError(
                "Please enter your symptoms before checking."
            );

            return;

        }


        try {

            setLoading(true);

            setError("");

            setResult(null);


            const response = await checkSymptoms({

                symptoms: symptoms

            });


            console.log(
                "AI Symptom Response:",
                response
            );


            setResult(
                response?.data ||
                response
            );


        } catch (error) {

            console.error(
                "Symptom Checker Error:",
                error
            );


            setError(

                error.message ||
                "Unable to analyze symptoms. Please try again."

            );


        } finally {

            setLoading(false);

        }

    };


    const handleClear = () => {

        setSymptoms("");

        setResult(null);

        setError("");

    };


    return (

        <div className="page-container">


            {/* Page Header */}

            <div className="page-header">

                <h1>
                    🤖 AI Symptom Checker
                </h1>

                <p>
                    Enter your symptoms and get an AI-powered
                    health analysis.
                </p>

            </div>


            <div className="symptom-container">


                {/* Symptom Input Card */}

                <div className="symptom-card">


                    <div className="symptom-icon">

                        🤖

                    </div>


                    <h2>
                        Tell Us How You Feel
                    </h2>


                    <p className="symptom-description">

                        Describe your symptoms in detail.
                        For example: fever, headache, cough,
                        body pain, stomach pain, etc.

                    </p>


                    {/* Error Message */}

                    {error && (

                        <div className="error-message">

                            ⚠️ {error}

                        </div>

                    )}


                    {/* Symptom Input */}

                    <div className="form-group">

                        <label>

                            📝 Your Symptoms

                        </label>


                        <textarea

                            value={symptoms}

                            onChange={(e) =>
                                setSymptoms(
                                    e.target.value
                                )
                            }

                            placeholder="Example: I have been experiencing fever, headache and body pain for the last two days."

                            rows="7"

                        />

                    </div>


                    {/* Buttons */}

                    <div className="symptom-actions">


                        <button

                            type="button"

                            className="primary-btn"

                            onClick={
                                handleCheckSymptoms
                            }

                            disabled={loading}

                        >

                            {loading

                                ? "🤖 AI is Analyzing..."

                                : "✨ Analyze Symptoms"

                            }

                        </button>


                        <button

                            type="button"

                            className="secondary-btn"

                            onClick={handleClear}

                            disabled={loading}

                        >

                            Clear

                        </button>


                    </div>


                </div>


                {/* AI Result */}

                {result && (

                    <div className="ai-result-card">


                        <div className="result-header">

                            <h2>
                                🧠 AI Health Analysis
                            </h2>


                            <span className="ai-badge">

                                AI RESULT

                            </span>

                        </div>


                        <div className="result-content">


                            <p>

                                {typeof result === "string"

                                    ? result

                                    : result.analysis ||
                                      result.data?.analysis ||
                                      "No analysis available."

                                }

                            </p>


                        </div>


                        <div className="medical-warning">

                            ⚠️ This AI analysis is for
                            informational purposes only.
                            Please consult a qualified
                            doctor for proper medical advice.

                        </div>


                    </div>

                )}


            </div>


        </div>

    );

}


export default SymptomChecker;
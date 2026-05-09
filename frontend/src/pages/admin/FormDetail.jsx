import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

export default function FormDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState(state?.form || null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (form || !id) {
            return;
        }

        const fetchForm = async () => {
            try {
                const res = await API.get("/admin/forms");
                const selectedForm = res.data.data.find((item) => item._id === id);

                if (selectedForm) {
                    setForm(selectedForm);
                } else {
                    setNotFound(true);
                }
            } catch (err) {
                console.log(err);
                setNotFound(true);
            }
        };

        fetchForm();
    }, [form, id]);

    const f = form;
    const cardStyle = {
        background: "#151921",
        border: "1px solid #1e2433",
        borderRadius: 12
    };

    const userFields = [
        { label: "Name", value: f?.userId?.name },
        { label: "Email", value: f?.userId?.email },
        {
            label: "Submitted At",
            value: f?.createdAt ? new Date(f.createdAt).toLocaleString() : null
        }
    ];

    const answerFields = [
        {
            question: "What is your favorite skill?",
            answer: f?.q1
        },
        {
            question: "Select your technologies",
            answer: Array.isArray(f?.q2) ? f.q2.join(", ") : f?.q2
        },
        {
            question: "Experience Level",
            answer: f?.q3
        }
    ];

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ background: "#1e2433", color: "#9ca3af" }}
            >
                Back
            </button>

            <h1 className="text-xl md:text-2xl font-bold mb-1" style={{ color: "#fff" }}>
                Form Details
            </h1>

            <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>
                Submitted form response
            </p>

            {notFound ? (
                <div className="p-5 md:p-6 max-w-lg" style={cardStyle}>
                    <p className="text-sm" style={{ color: "#9ca3af" }}>
                        Form details not found
                    </p>
                </div>
            ) : (
                <div className="p-5 md:p-6 max-w-2xl space-y-5" style={cardStyle}>
                    {userFields.map(({ label, value }) => (
                        <div
                            key={label}
                            style={{
                                borderBottom: "1px solid #1e2433",
                                paddingBottom: 12
                            }}
                        >
                            <p
                                className="text-xs font-semibold mb-1"
                                style={{ color: "#4b5563" }}
                            >
                                {label}
                            </p>

                            <p className="text-sm font-medium" style={{ color: "#fff" }}>
                                {value || "N/A"}
                            </p>
                        </div>
                    ))}

                    {answerFields.map(({ question, answer }, index) => (
                        <div
                            key={question}
                            style={{
                                borderBottom:
                                    index === answerFields.length - 1
                                        ? "none"
                                        : "1px solid #1e2433",
                                paddingBottom: index === answerFields.length - 1 ? 0 : 12
                            }}
                        >
                            <p
                                className="text-xs font-semibold mb-1"
                                style={{ color: "#4b5563" }}
                            >
                                Question {index + 1}
                            </p>

                            <p className="text-sm font-semibold mb-2" style={{ color: "#fff" }}>
                                {question}
                            </p>

                            <p className="text-sm" style={{ color: "#9ca3af" }}>
                                {answer || "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

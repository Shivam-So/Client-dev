import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AdminForms() {

    const [forms, setForms] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const perPage = 5;

    useEffect(() => {

        const fetchForms = async () => {
            try {

                const res = await API.get("/admin/forms");

                const sorted = res.data.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setForms(sorted);

            } catch (err) {
                console.log(err);
            }
        };

        fetchForms();

    }, []);

    const totalPages = Math.ceil(forms.length / perPage);

    const currentForms = forms.slice(
        (page - 1) * perPage,
        page * perPage
    );

    const cardStyle = {
        background: "#151921",
        border: "1px solid #1e2433",
        borderRadius: 12
    };

    return (
        <div>

            <h1
                className="text-xl md:text-2xl font-bold mb-1"
                style={{ color: "#fff" }}
            >
                Forms
            </h1>

            <p
                className="text-sm mb-6"
                style={{ color: "#9ca3af" }}
            >
                All submitted forms
            </p>

            <div
                className="
                transition-all duration-300
                hover:shadow-2xl
                "
                style={cardStyle}
            >

                <div className="overflow-x-auto">

                    <table
                        className="w-full text-left"
                        style={{ minWidth: 300 }}
                    >

                        <thead>
                            <tr style={{ borderBottom: "1px solid #1e2433" }}>

                                {["Name", "Submitted At", "Details"].map(h => (
                                    <th
                                        key={h}

                                        className="
                                        px-4 md:px-5 py-3
                                        text-xs font-semibold uppercase
                                        "

                                        style={{ color: "#4b5563" }}
                                    >
                                        {h}
                                    </th>
                                ))}

                            </tr>
                        </thead>

                        <tbody>

                            {currentForms.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan={3}

                                        className="
                                        px-5 py-6
                                        text-center text-sm
                                        "

                                        style={{ color: "#9ca3af" }}
                                    >
                                        No forms found
                                    </td>
                                </tr>

                            ) : (

                                currentForms.map((f) => (

                                    <tr
                                        key={f._id}

                                        style={{
                                            borderBottom: "1px solid #1e2433"
                                        }}
                                    >

                                        {/* Name */}
                                        <td
                                            className="
                                            px-4 md:px-5 py-3
                                            text-sm font-medium
                                            transition-all duration-300
                                            hover:bg-[#111827]
                                            hover:text-blue-400
                                            hover:scale-[1.03]
                                            hover:shadow-2xl
                                            cursor-pointer
                                            "

                                            style={{ color: "#fff" }}
                                        >
                                            {f.userId?.name || "N/A"}
                                        </td>

                                        {/* Date */}
                                        <td
                                            className="
                                            px-4 md:px-5 py-3
                                            text-sm
                                            transition-all duration-300
                                            hover:bg-[#111827]
                                            hover:text-white
                                            hover:scale-[1.03]
                                            hover:shadow-2xl
                                            cursor-pointer
                                            "

                                            style={{ color: "#9ca3af" }}
                                        >
                                            {new Date(f.createdAt).toLocaleDateString()}
                                        </td>

                                        {/* Button */}
                                        <td
                                            className="
                                            px-4 md:px-5 py-3
                                            transition-all duration-300
                                            hover:bg-[#111827]
                                            "
                                        >

                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/forms/${f._id}`, {
                                                        state: { form: f }
                                                    })
                                                }

                                                className="
                                                px-3 py-1.5 rounded
                                                text-xs font-medium
                                                cursor-pointer
                                                transition-all duration-300
                                                hover:scale-105
                                                hover:shadow-xl
                                                hover:-translate-y-1
                                                "

                                                style={{
                                                    background: "#1e3a5f",
                                                    color: "#60a5fa"
                                                }}
                                            >
                                                View
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div
                    className="
                    flex justify-end items-center
                    gap-2 px-4 md:px-5 py-4 flex-wrap
                    "

                    style={{
                        borderTop: "1px solid #1e2433"
                    }}
                >

                    {/* Prev */}
                    <button
                        onClick={() =>
                            setPage(p => Math.max(p - 1, 1))
                        }

                        disabled={page === 1}

                        className="
                        px-3 py-1.5 rounded text-sm
                        cursor-pointer
                        transition-all duration-300
                        hover:scale-105
                        hover:shadow-xl
                        "

                        style={{
                            background: "#1e3a5f",
                            color: "#60a5fa",
                            opacity: page === 1 ? 0.4 : 1
                        }}
                    >
                        Prev
                    </button>

                    {/* Pages */}
                    {Array.from(
                        { length: totalPages },
                        (_, i) => i + 1
                    ).map(p => (

                        <button
                            key={p}

                            onClick={() => setPage(p)}

                            className="
                            px-3 py-1.5 rounded text-sm
                            cursor-pointer
                            transition-all duration-300
                            hover:scale-105
                            hover:shadow-xl
                            "

                            style={{
                                background:
                                    page === p
                                        ? "#3b82f6"
                                        : "#1e2433",

                                color:
                                    page === p
                                        ? "#fff"
                                        : "#9ca3af"
                            }}
                        >
                            {p}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        onClick={() =>
                            setPage(p =>
                                Math.min(p + 1, totalPages)
                            )
                        }

                        disabled={
                            page === totalPages ||
                            totalPages === 0
                        }

                        className="
                        px-3 py-1.5 rounded text-sm
                        cursor-pointer
                        transition-all duration-300
                        hover:scale-105
                        hover:shadow-xl
                        "

                        style={{
                            background: "#1e3a5f",
                            color: "#60a5fa",

                            opacity:
                                (page === totalPages ||
                                    totalPages === 0)
                                    ? 0.4
                                    : 1
                        }}
                    >
                        Next
                    </button>

                </div>
            </div>
        </div>
    );
}

import { links } from "@/data--backup/links";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const StudyMaterialMegamenu = ({ allClasses }) => {
    const [exploreActive, setExploreActive] = useState(false);
    const { pathname } = useLocation();

    const menuData = [
        {
            title: "Cloud Computing",
            subItems: [
                {
                    title: "AWS",
                    subItems: ["EC2", "S3", "Lambda"],
                    links: ['/cheatsheet/aws/ec2', '/cheatsheet/aws/s3', '/cheatsheet/aws/lambda'],
                },
                {
                    title: "Azure",
                    subItems: ["Virtual Machines", "Blob Storage"],
                    links: ['/cheatsheet/azure/vm', '/cheatsheet/azure/blob'],
                },
                {
                    title: "Google Cloud",
                    subItems: ["Compute Engine", "Cloud Functions"],
                    links: ['/cheatsheet/gcp/compute', '/cheatsheet/gcp/functions'],
                },
            ],
        },
        {
            title: "Artificial Intelligence",
            subItems: [
                {
                    title: "NLP",
                    subItems: ["Sentiment Analysis", "Text Generation"],
                    links: ['/cheatsheet/ai/sentiment/analysis', '/cheatsheet/ai/text/generation'],
                },
                {
                    title: "Computer Vision",
                    subItems: ["Image Classification", "Object Detection"],
                    links: ['/cheatsheet/cv/image/classification', '/cheatsheet/cv/object/detection'],
                },
            ],
        },
        {
            title: "Machine Learning",
            subItems: [
                {
                    title: "Supervised Learning",
                    subItems: ["Regression", "Classification"],
                    links: ['/cheatsheet/ml/supervised/regression', ''],
                },
                {
                    title: "Unsupervised Learning",
                    subItems: ["Clustering", "Dimensionality Reduction"],
                },
            ],
        },
    ];

    return (
        <div className={`${allClasses ? allClasses : ""} position-relative`}>
            <Link
                to="#"
                onClick={() => setExploreActive((prev) => !prev)}
                className="d-flex align-items-center text-white text-nowrap" style={{ fontSize: "14px", gap:'5px' }}
            >
                <i className="icon icon-online-learning mr-2"></i>
                Study Material
            </Link>

            {exploreActive && (
                <div
                    className="bg-white shadow rounded-2 p-3 position-absolute mt-2"
                    style={{
                        zIndex: 1000,
                        display: "flex",
                        gap: "30px",
                        minWidth: "800px",
                        left: 0,
                    }}
                >
                    {menuData.map((mainItem, i) => (
                        <div key={i}>
                            <h6 className="fw-bold text-primary mb-2">{mainItem.title}</h6>
                            {mainItem.subItems.map((subItem, j) => (
                                <div key={j} className="mb-3">
                                    <p className="mb-1 text-dark fw-semibold">{subItem.title}</p>
                                    <ul className="list-unstyled ps-3">
                                        {subItem.subItems.map((item, k) => {
                                            // Use matching index if links exist
                                            const link = subItem.links?.[k] || "#";
                                            return (
                                                <li key={k}>
                                                    <Link
                                                        to={link}
                                                        className={`text-dark text-decoration-none d-block py-1 ${pathname === link ? "active" : ""
                                                            }`}
                                                        style={{ fontSize: "14px" }}
                                                    >
                                                        {item}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudyMaterialMegamenu;

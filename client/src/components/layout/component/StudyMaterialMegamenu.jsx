import { links } from "@/data--backup/links";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const StudyMaterialMegamenu = ({ allClasses }) => {
    const [exploreActive, setExploreActive] = useState(false);
    const { pathname } = useLocation();
    const linkRef = useRef(null);

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
                    links: ['/cheatsheet/ml/supervised/regression', '/cheatsheet/ml/supervised/classification'],
                },
                {
                    title: "Unsupervised Learning",
                    subItems: ["Clustering", "Dimensionality Reduction"],
                    links: ['/cheatsheet/ml/unsupervised/clustering', '/cheatsheet/ml/unsupervised/dimensionality/reduction'],
                },
            ],
        },
        {
            title: "Web Development",
            subItems: [
                {
                    title: "Frontend Frameworks",
                    subItems: ["React JS", "Angular", "Vue JS", "Next JS"],
                    links: ['/cheatsheet/web/reactjs', '/cheatsheet/web/angular', '/cheatsheet/web/vuejs', '/cheatsheet/web/nextjs'],

                },
                {
                    title: "Backend Frameworks",
                    subItems: ["Node JS", "Express JS", "Django", "Flask", "FastAPI"],
                    links: ['/cheatsheet/web/nodejs', '/cheatsheet/web/expressjs', '/cheatsheet/web/django', '/cheatsheet/web/flask', '/cheatsheet/web/fastapi'],

                },
            ],
        },
    ];

    useEffect(() => {
        const handleClick = (event) => {
            if (linkRef.current && linkRef.current.contains(event.target)) {
                // Click originated from the link itself, ignore
                return;
            }

            setExploreActive((prev) => {
                if (prev) {
                    return false;
                }
                return prev;
            });
        };
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const closeMegaMenu = () => {
        setExploreActive(false);
    };

    return (
        <div className={`${allClasses ? allClasses : ""} position-relative`}>
            <Link
                ref={linkRef}
                to="#"
                onClick={() => setExploreActive((prev) => !prev)}
                className="d-flex align-items-center text-white text-nowrap" style={{ fontSize: "14px", gap: '5px', color: 'black' }}
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
                                                        onClick={closeMegaMenu}
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

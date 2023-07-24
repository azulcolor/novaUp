import React from "react";
import Card from "../components/common/Card";

export default async function Categories() {
    return (
        <>
            <div className="body">
                <div className="top-utilies">
                    <select className="select">
                        <option>Deporte</option>
                        <option>Ciencias</option>
                        <option>Academicos</option>
                        <option>Literatura</option>
                        <option>Moderno</option>
                    </select>
                </div>
                <div className="content">
                    <div className="content-posts">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        </>
    );
}
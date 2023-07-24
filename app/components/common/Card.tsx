import React from "react";
import Image from "next/image";
import { CustomButton } from "../CustomInputs/CustomButton";

export default function card() {


    return (
        <div className="card-body">
            <div className="card-content">
                <div>
                    <div className="card-text">
                        hello world
                    </div>
                    <div className="card-subtext">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sem ac lectus auctor finibus sed sodales nisl. 
                    </div>
                    <div className="btn-primary">
                        <CustomButton title={"Leer mas"} handleClick=""/>
                    </div>
                </div>
                <Image src={'/assets/images/logo.png'} alt="logo" width={160} height={90} />
            </div>
        </div>
    );
}
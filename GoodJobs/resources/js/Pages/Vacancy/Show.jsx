import React, { useState } from "react";

const Vacancy = ({ vacancy }) => {

    console.log(vacancy)
    return (
        <>
            <div>
                <h1>{vacancy.name}</h1>

            </div>
        </>
    )
}

export default Vacancy

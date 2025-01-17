import React from "react";
import { Head } from "@inertiajs/react";
import { CompanyPageMockData } from "./CompanyPageMockData";
import CompanyPageBody from "./CompanyPageBody";

function CompanyPage({ auth, company, isSubscribed }) {
    const user = auth?.user;
    const data = CompanyPageMockData();
    console.log(data);
    //console.log(isSubscribed);
    data.company = (company);
    data.isSubscribed = (isSubscribed);
    data.user = (user);

    return (
        <>
            <Head>
                <title>Компания</title>
            </Head>
            <CompanyPageBody {...data} />
        </>
    );
}

export default CompanyPage;

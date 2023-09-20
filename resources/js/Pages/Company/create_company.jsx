import MainLayout from "@/5Layouts/MainLayout/MainLayout";
import {AppPage} from "@/5Layouts/AppPage/AppPage";
import React, {useState} from "react";
import {useForm} from "@inertiajs/react";

const Company = ({auth}) => {
    const user = auth?.user;

    const {data, setData, post, errors} = useForm({
        name: '',
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('company.store'))
    }

    return (
        <MainLayout className={"app_light_theme"}>
            <AppPage>
                <h1>Новая компания</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Имя:</label>
                    <input id="title" value={data.name} onChange={e => setData('name', e.target.value)} />

                    <button type="submit">Отправить</button>
                </form>
            </AppPage>
        </MainLayout>
    );
};
export default Company;


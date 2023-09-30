import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "@/8Shared/ui/AppButton/AppButton";
import AppInput from "@/8Shared/ui/AppInput/AppInput";
import {
    setResponsibilitiesInput,
    setResponsibilitiesList,
} from "../../model/slice/vacancyPageCreateSlice";
import cn from "classnames";
import s from "../VacancyPageCreate/VacancyPageCreate.module.css";
function VacancyCreateResponsibilities(props) {
    const dispatch = useDispatch();
    const { responsibilitiesInput, responsibilitiesList } = useSelector(
        (state) => state.vacancyPageCreate
    );

    return (
        <div className={cn(s.empolyments, s.item)}>
            {responsibilitiesList ? (
                <div className={s.responsibilitiesList}>
                    {responsibilitiesList?.map(
                        (responsibilitiesItem, index) => {
                            return (
                                <div className={s.listItem} key={index}>
                                    <div>{responsibilitiesItem}</div>
                                    <AppButton
                                        sizeText={"xs"}
                                        variant={"clear"}
                                        colorType={"cancel"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            responsibilitiesList.splice(
                                                index,
                                                1
                                            );
                                            const newResponsibilitiesList = [
                                                ...responsibilitiesList,
                                            ];

                                            dispatch(
                                                setResponsibilitiesList([
                                                    ...newResponsibilitiesList,
                                                ])
                                            );
                                        }}
                                    >
                                        Удалить
                                    </AppButton>
                                </div>
                            );
                        }
                    )}
                </div>
            ) : null}
            <AppInput
                label="Обязаность сотрудника"
                value={responsibilitiesInput}
                onChange={(e) => {
                    dispatch(setResponsibilitiesInput(e.target.value));
                }}
            />
            <AppButton
                variant="clear"
                colorType="hint"
                sizeText="s"
                onClick={(e) => {
                    e.preventDefault();
                    if (responsibilitiesInput) {
                        dispatch(
                            setResponsibilitiesList([
                                ...responsibilitiesList,
                                responsibilitiesInput,
                            ])
                        );
                    }

                    dispatch(setResponsibilitiesInput(""));
                }}
            >
                Добавить обязаность
            </AppButton>
        </div>
    );
}

VacancyCreateResponsibilities.propTypes = {};

export default VacancyCreateResponsibilities;
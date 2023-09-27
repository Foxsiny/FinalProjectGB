import React from "react";
import { useForm, usePage } from "@inertiajs/react";
//import PropTypes from 'prop-types'
import s from "./ResumePage.module.css";

import { AppPage } from "@/5Layouts/AppPage/AppPage";
import AppText from "@/8Shared/ui/AppText/AppText";
import AppButton from "@/8Shared/ui/AppButton/AppButton";

function ResumePage({ resume }) {
    //console.log(resume);
    const user = usePage().props.auth.user;

    const { data } = useForm({
        user_id: user.id,
        profession: resume.profession,
        first_name: resume.first_name,
        last_name: resume.last_name,
        gender: resume.gender,
        region: resume.region,
        date_of_birth: resume.date_of_birth,
        phone: resume.phone,
        citizenship: resume.citizenship,
        work_permit: resume.work_permit,
        education: resume.education,
        educational_institute: resume.educational_institute,
        companies: resume.companies,
        skills: resume.skills,
        experience: resume.experience,
    });

    //высчитываем из даты рождения сколько полных лет
    const dateOfBirth = data.date_of_birth;
    function declOfNum(number, titles) {
       let cases = [2, 0, 1, 1, 1, 2];
        return number + " " + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
      }
      
      function birthDateToAge(b) {
        var n = new Date(),
            b = new Date(b),
            age = n.getFullYear() - b.getFullYear();
        return n.setFullYear(1970) < b.setFullYear(1970) ? age - 1 : age;
      }
      const Yers = (declOfNum(birthDateToAge(dateOfBirth), ['год', 'года', 'лет']));
    //  console.log(Yers);

    //переводим из падежа в существительное gender пользователя
    const dataGender = data.gender;
    function dataGenderOfUser() {
        let gender = "";
        if (dataGender == "Мужской"){
            gender = "Мужчина";
        }else{
            gender = "Женщина";
        }
        return gender;
    }
       
    const genderOfUser = dataGenderOfUser(dataGender);
    //console.log(genderOfUser);
    
    //форматируем дату рождения
        const dayOfBirth = new Date(dateOfBirth);
        const dateSrc = dayOfBirth.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' });
        const dateOfBirthUser = dateSrc.split(".").join(" ");
    return (
        <>
            <AppPage>
                <container className={s.containerResumePage}>
                    <main className={s.mainResumePage}>
                            <AppButton
                                href={route("resume.index")}
                                variant="clear"
                                className={s.linkResumePage}
                            >
                                К списку моих резюме
                            </AppButton>

                        <div class={s.baceData}>
                            <div class={s.userBaceData}>
                                <AppText 
                                    text={"Сейчас на сайте"} 
                                    size="s" 
                                />
                                <AppText
                                    title={data.last_name.concat(" ", data.first_name)}
                                    size="s"
                                    bold
                                />
                                <AppText 
                                    size="s"
                                    text={genderOfUser.concat(", ", Yers, ", ", dateOfBirthUser, " года рождения")}
                                />
                                <div className={s.userContacts}>
                                    <AppText title={"Контакты"} size="s" />
                                    <AppText
                                        text={data.phone}
                                        size="s"
                                        className={s.userContactsPhone}
                                    />
                                    <div className={s.userEmail}>
{/* не знаю как прокинуть email */}
                                        <AppText
                                            text={
                                                <span
                                                    className={s.userEmailText}
                                                >
                                                    IvanovIvan@mail.ru
                                                </span>

                                            }
                                            size="s"
                                        />
                                        <AppText
                                            text={
                                                " — предпочитаемый способ связи"
                                            }
                                            size="s"
                                        />
                                    </div>
                                </div>
{/* не знаю откуда тянуть эту информацию */}
                                <AppText 
                                    text={data.region.concat(", не готов к переезду", ", не готов к командировкам")} 
                                        size="s" 
                                    />
                                <div className={s.userSearchArea}>
                                    <AppText
                                        text={"Указан примерный район поиска работы"}
                                        size="s"
                                    />
                                    <a href="#" className={s.linkResumePage}>
                                        Показать карту
                                    </a>
                                </div>
                            </div>
                            <div class={s.userPhoto}>
                                <img src="#" className={s.imgUserPhoto} />
                                {/* <a href="#" className={s.linkResumePage}>Изменить фото</a> */}
                            </div>
                        </div>

                        <div className={s.userSpeciality}>
                            <AppText title={data.profession} size="s" bold />
                            <div className={s.specialization}>
                                    <AppText text={"Специализации:"} size="s" />
                            {
                                data.educational_institute.map((el) => {
                                    return (
                                        <AppText
                                            text={" - ".concat(el.specialization)}
                                            size="s"
                                            className={s.specializationText}   
                                        />
                                   )
                                })
                            }
                            </div> 

                            <div className={s.employment}>
{/* не знаю откуда тянуть эту информацию */}
                                <AppText 
                                    text={"Занятость"} 
                                    size="s" 
                                />
                                <AppText 
                                    text={": полная занятость"} 
                                    size="s" 
                                />
                                <AppText 
                                    text={", стажировка"} 
                                    size="s" 
                                />
                            </div>
{/* не знаю откуда тянуть эту информацию */}
                            <div className={s.schedule}>
                                <AppText text={"График работы"} size="s" />
                                <AppText text={": полный день"} size="s" />
                                <AppText text={", сменный график"} size="s" />
                                <AppText text={", гибкий график"} size="s" />
                                <AppText text={", удаленная работа"} size="s" />
                            </div>
                        </div>

                        {
                            data.companies.map((el) => {

                                //расчет стажа работы
                                let dataWorkBegin = el.start_date;
                                let dataWorkEnd = el.end_data;
                                
                                //по настоящее время
                                function declOfNum(number, titles) {
                                let cases = [2, 0, 1, 1, 1, 2];
                                    return number + " " + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
                                }
                                
                                function worksExperience(b) {
                                    var n = new Date(),
                                        b = new Date(b),
                                        age = n.getFullYear() - b.getFullYear(),
                                        month = n.getMonth() - b.getMonth();
                                        if (month < 0 || (month === 0 && n.getDate() < b.getDate())){
                                            age--;
                                         }   
                                    return (
                                       
                                       n.setFullYear(1970) < b.setFullYear(1970) ? age - 1 : age 
                                    )
                                }
                                const Yers = (declOfNum(worksExperience(dataWorkBegin), ['год', 'года', 'лет']));
                                //console.log(Yers);
                                
                                //форматы даты периода работы
                                function dateFormatYearsMonch(date){
                                    const dayFormat = new Date(date);
                                    const dateSrc = dayFormat.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric'});
                                    const dateDst = dateSrc.split(".").join(" ");
                                    
                                    return(
                                        dateDst
                                    )
                                }
                                const dataWorksBegin = dateFormatYearsMonch(dataWorkBegin);
                                const dataWorksEnd = dateFormatYearsMonch(dataWorkEnd);
                                console.log(dataWorksBegin);

                                return (
                                    <>
{/* не знаю как вытянуть период стажа работы, общий стаж */}
                                        <div className={s.workExperience}>
                                            <AppText
                                                title={"4 года 9 месяцев"}
                                                size="s"
                                                bold
                                            />

                                            <div className={s.workPeriods}>
                                                <div className={s.userWorkPeriod}>
                                                    <AppText
                                                        text={dataWorksBegin}
                                                        size="s"
                                                    />
                                                    <AppText
                                                        text={Yers}
                                                        size="s"
                                                    />
                                                </div>

                                                <div className={s.descriptionExperience}>
                                                    <div className={s.company}>
                                                        <AppButton
                                                            variant="clear"
                                                            sizeText="s"
                                                            className={s.userEmailText}
                                                            href="#"
                                                        >{el.name}
                                                        </AppButton>
                                                        
                                                        <AppText 
                                                            text={"Москва"} 
                                                            size="s" 
                                                        />
                                                        
                                                        <AppText 
                                                            text={"ЖКХ"} 
                                                            size="s" 
                                                        />
                                                    </div>
                                                
                                                    <div className={s.responsibilities}>
                                                        <AppText
                                                            bold
                                                            title={el.position}
                                                            size="s"
                                                        />

                                                        <AppText
                                                            size="s"
                                                            text={el.achievements}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                        
                        
                        <div className={s.keySkills}>
                            
                            <AppText
                                title={"Ключевые навыки"}
                                size="s"
                                bold
                            />
                           
                            {
                                data.skills.map((el) => {
                                    return (
                                        <div className={s.keySkillsTextAll}>
                                            <div>
                                                <AppText
                                                    text={el}
                                                    size="s"
                                                    className={s.keySkillsText}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={s.aboutUser}>
                            <div className={s.aboutUserTitle}>
                                <AppText 
                                bold 
                                title={"Обо мне"} 
                                size="s" 
                            />
                            </div>
{/* не знаю откуда тянуть эту информацию */}
                            <div className={s.aboutUserTextAll}>
                                <AppText
                                    text={
                                        "Усидчивый, внимательный, целеустремленный, легко вливаюсь в коллектив. Инженер систем водоснабжения и водоотведения. Ищу работу для получения опыта и получение более обширных знаний в этой сфере. Готов к любой работе"
                                    }
                                    size="s"
                                    className={s.aboutUserText}
                                />
                            </div>
                        </div>
                           
                        <div className={s.education}>
                            <AppText
                                bold
                                title={data.education}
                                size="s"
                            />
{/* не знаю откуда взять данные по дате начала обучения */}                                
                            {
                                data.educational_institute.map((el) => {
                                    let yearsEducation = new Date(el.graduation_year);
                                    let yearsEducationExit = yearsEducation.getFullYear();
                                    return (
                                        <div className={s.educationPeriods}>
                                            <div className={s.userEducationPeriod}>
                                                <AppText
                                                    text={yearsEducationExit}
                                                    size="s"
                                                />
                                            </div>
                                            <div className={s.descriptionEducation}>
                                                <AppText
                                                    size="s"
                                                    text={el.title}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className={s.workConditions}>
                            <AppText
                                title={"Гражданство, время пути до работы"}
                                size="s"
                                bold
                            />
                            <AppText 
                                text={"Гражданство: ".concat(data.citizenship)} 
                                size="s" 
                            />
                                
                            <AppText
                                text={"Разрешение на работу: ".concat(data.work_permit)}
                                size="s"
                            />
{/* не знаю откуда тянуть эту информацию */}                                
                            <AppText
                                text={"Желательное время в пути до работы".concat(": не имеет значения")}
                                size="s"
                            />
                        </div>
                       

                        <AppButton
                            path={"resume.edit"}
                            param={resume.id}
                            key={resume.id}
                            type="submit"
                            bold
                            sizeText="s"
                            className={s.buttonSave}
                        >
                            <span>Редактировать</span>
                        </AppButton>
                    </main>
                </container>
            </AppPage>
        </>
    );
}

//ResumePage.propTypes = {}

export default ResumePage;

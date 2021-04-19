import React from "react";
import style from './Forms.module.css'
import cn from "classnames";

const ChangeUnitsForm = (props) => {

    let onChangeUnit = (value) => {
        let name = value.currentTarget.attributes.value.nodeValue;
        props.changeUnit(name);
    };

    return(
        <div className={style.unitsForm_wrapper}>
            <div className={style.unitsForm_degree}>° </div>
            <div className={style.unitsForm_buttons}>
                <div className={cn(style.unitsForm_button_F, {[style.unitsForm_button_active]: props.currentUnit === 'imperial'})} onClick={onChangeUnit} value={'imperial'}>
                    <div>
                        F
                    </div>
                </div>
                <div className={cn(style.unitsForm_button_C, {[style.unitsForm_button_active]: props.currentUnit === 'metric'})} onClick={onChangeUnit} value={'metric'}>
                    <div>
                        C
                    </div>

                </div>
            </div>

        </div>
        )
};

export default ChangeUnitsForm;

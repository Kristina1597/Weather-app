import React, {useEffect, useState} from "react";
import style from './Forms.module.css';
import cn from "classnames"


const ChangeCityForm = (props) => {

    const cities = Object.values(Object.assign({}, props.cities.map((c) => c.name)));

    const [isCityChosen, setCityChosen] = useState(true);
    const [formValue, setFormValue] = useState(props.currentCity.name);
    const [isListOpened, setListOpening] = useState(false);
    const [isListFiltered, setListFiltered] = useState(false);
    const [filteredCities, setCities] = useState("");

    let newCities = [];

    useEffect(() => {
        console.log(formValue);
    });

    let onChange = (e) => {
        newCities = [];
        let value = e.currentTarget.value;
        setListFiltered((value.length !== 0));

        setListOpening(true);
        setFormValue(value);

        cities.forEach((c) => {
            if (c.toLowerCase().includes(value.toLowerCase())) {
                newCities.push(c);
            }
        });

        setCities(newCities);
    };

    let openList = () => {
        setListOpening(true);
    };

    let closeList = (e) => {
        setListOpening(false)
    };

    let onCitiesListClick = (e) => {
        setFormValue(e.currentTarget.textContent);
    };



    let onOkClick = (e) => {
        props.setLocalCityChosen(false);
        let newCurrentCityName = e.currentTarget.parentElement.children[0].value;
        props.cities.forEach((c) => {
            if (c.name === newCurrentCityName) {
                props.changeCity(newCurrentCityName);
                props.turnOffEditMode();
            }
        });


    };


    return (<div className={cn(style.form_blockWithForm, {[style.form_openedList]: isListOpened})}
                 aria-expanded={"false"}
                 aria-haspopup={"listbox"}
                 aria-owns={'custom_select_list'}
                 role={'combobox'}>

            <div className={style.form_blockWithInput}>
                <input
                    // onClick={isListOpened ? closeList : openList}
                       onChange={onChange}
                       onBlur={closeList}
                       onFocus={openList}
                       className={style.form_input}
                       type={'text'}
                       aria-describedby={'custom_select_info'}
                       aria-autocomplete={"both"}
                       aria-controls={'custom_select_list'}
                tabIndex={-1}
                value={formValue}/>
                <button className={style.form_button}
                        onClick={onOkClick}>OK</button>
            </div>
            <div className={cn(style.form_blockWithList, {[style.hidden_all]: !isListOpened})} role={'listbox'}>
                {isListFiltered ? filteredCities.map((c) => <div key={c.key}
                                                                 role={'option'}
                                                                 tabIndex={10}
                                                                 value={c}
                                                                 className={style.form_listItem}
                                                                 onMouseDown={onCitiesListClick}>
                        {c}
                    </div>)
                    : cities.map((c) => <div key={c.key}
                                             role={'option'}
                                             tabIndex={10}
                                             value={c}
                                             className={style.form_listItem}
                                             onMouseDown={onCitiesListClick}>
                        {c}
                    </div>)
                }
            </div>

        </div>
    )
};

export default ChangeCityForm;

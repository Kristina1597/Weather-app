import React, {useState} from "react";
import style from './Forms.module.css';
import cn from "classnames"

const ChangeCityForm = (props) => {

    const cities = Object.values(Object.assign({}, props.cities.map((c) => c.name)));
    let newCities = [];

    const [formValue, setFormValue] = useState(props.currentCity.name);
    const [isListOpened, setListOpening] = useState(false);
    const [isListFiltered, setListFiltered] = useState(false);
    const [filteredCities, setCities] = useState("");

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

    let closeList = () => {
        setListOpening(false)
    };

    let onChooseCity = (e) => {
        setFormValue(e.currentTarget.textContent);
    };

    let onSubmit = (e) => {
        props.setLocalCityChosen(false);
        let newCurrentCityName = e.currentTarget.parentElement.children[0].value;
        props.cities.forEach((c) => {
            if (c.name === newCurrentCityName) {
                props.changeCity(newCurrentCityName);
                props.turnOffEditMode();
            }
        });
    };

    return (<div className={cn(style.form_blockWithForm, {[style.form_openedList]: isListOpened})}>
            <div className={style.form_blockWithInput}>
                <input onChange={onChange}
                       onBlur={closeList}
                       onFocus={openList}
                       className={style.form_input}
                       type={'text'}
                       tabIndex={-1}
                       value={formValue}/>
                <button className={style.form_button}
                        onClick={onSubmit}>
                    OK
                </button>
            </div>
            <div className={cn(style.form_blockWithList, {[style.hidden_all]: !isListOpened})}>
                {isListFiltered ? filteredCities.map((c) => <div key={c.key}
                                                                 tabIndex={10}
                                                                 className={style.form_listItem}
                                                                 onMouseDown={onChooseCity}>
                        {c}
                    </div>)
                    : cities.map((c) => <div key={c.key}
                                             tabIndex={10}
                                             className={style.form_listItem}
                                             onMouseDown={onChooseCity}>
                        {c}
                    </div>)
                }
            </div>
        </div>
    )
};

export default ChangeCityForm;

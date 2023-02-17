import { dropdownFieldStructure } from "../../Utils/FormStructure";

function DropdownFields(props) {
    const { dispatch, currState, occupationList, stateList } = props;
    return dropdownFieldStructure.map((element) => {
        const desiredArray = element.title === 'occupation' ? occupationList : stateList;
       return (
            <div key={element.id} className="form-group">
                <label htmlFor={element.title}>{element.label}</label>
                <element.htmlType 
                    value={currState[element.title]}
                    type={element.type} 
                    name={element.title} 
                    id={element.title} 
                    onChange={(event) => dispatch({type: `update_${element.title}`, value: event.currentTarget.value})}
                >
                <option value='' defaultValue=''>Please Select</option>
                {
                    desiredArray.map((optionElements, idx) => {
                        return (
                            <option key={idx} value={optionElements.name || optionElements}>{optionElements.name || optionElements}</option>
                        )
                    })
                }
                </element.htmlType>
            </div>
        )
    });
}

export default DropdownFields;
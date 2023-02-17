import { textFieldStructure } from "Utils/FormStructure";

function TextFields(props) {
    const { dispatch, currState } = props;
    return textFieldStructure.map((element) => {
        return (
            <div key={element.id} className="form-group">
                <label htmlFor={element.title}>{element.label}</label>
                <element.htmlType 
                    value={currState[element.title]}
                    type={element.type} 
                    name={element.title} 
                    id={element.title} 
                    placeholder={element?.placeholder} 
                    onChange={(event) => {dispatch({type: `update_${element.title}`, value: event.target.value})}}
                />
            </div>
        )
    });
}

export default TextFields;
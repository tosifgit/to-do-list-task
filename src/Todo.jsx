import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Todo = () => {
    const [formval, setFormVal] = useState("");
    const [mydata, setMydata] = useState([]);

    const changer = (e, index) => {
        if (index !== undefined) {
            const newData = mydata.map((data, i) =>
                i === index ? { ...data, item: e.target.value } : data
            );
            setMydata(newData);
        } else {
            setFormVal(e.target.value);
        }
    };

    const addfnx = (e) => {
        e.preventDefault();
        setMydata([...mydata, { item: formval, completed: false, isEdit: false }]);
        setFormVal("");
    };

    const myToggle = (index) => {
        const newData = mydata.map((data, i) =>
            i === index ? { ...data, completed: !data.completed } : data
        );
        setMydata(newData);
    };

    const remove = (index) => {
        const newData = mydata.filter((_, i) => i !== index);
        setMydata(newData);
    };

    const editItem = (index) => {
        const newData = mydata.map((data, i) =>
            i === index ? { ...data, isEdit: !data.isEdit } : data
        );
        setMydata(newData);
    };

    const saveItem = (index) => {
        const newData = mydata.map((data, i) =>
            i === index ? { ...data, isEdit: false } : data
        );
        setMydata(newData);
    };

    return (
        <div className="container mt-5" style={{ width: "600px" }}>
            <div className="card">
                <div className="card-header">
                    <form onSubmit={addfnx} className="d-flex">
                        <input type="text" value={formval} onChange={(e) => changer(e)} className="form-control me-2" placeholder="Add a new task" />
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
                <div className="card-body">
                    {mydata.map((e, i) => (
                        <div className="d-flex align-items-center mb-2" key={i}>
                            <input
                                type="checkbox"
                                checked={e.completed}
                                onChange={() => myToggle(i)}
                                className="form-check-input me-2"
                            />
                            {e.isEdit ? (
                                <input
                                    type="text"
                                    value={e.item}
                                    onChange={(event) => changer(event, i)}
                                    className="form-control me-2"
                                />
                            ) : (
                                <span
                                    className="me-auto"
                                    style={e.completed ? { textDecoration: "line-through" } : null}
                                >
                                    {e.item}
                                </span>
                            )}
                            {e.isEdit ? (
                                <button onClick={() => saveItem(i)} className="btn btn-success me-2" style={{ width: "80px" }}>Save</button>
                            ) : (
                                <button onClick={() => editItem(i)} className="btn btn-warning me-2" style={{ width: "80px" }}>Edit</button>
                            )}
                            <button onClick={() => remove(i)} className="btn btn-danger">x</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Todo;

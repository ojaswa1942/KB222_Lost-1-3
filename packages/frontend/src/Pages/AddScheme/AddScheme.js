import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import { Link } from "react-router-dom";
import styles from "./AddScheme.module.css";
import { ReactComponent as SaveLogo } from "../../assets/icons/icons8_checked_1.svg";
import { ReactComponent as CancelLogo } from "../../assets/icons/icons8_cancel.svg";
import Select from "react-dropdown-select";

const AddScheme = () => {
  const { register, handleSubmit, errors, control } = useForm();
  const [department] = useState([
    { id: 0, name: "Finance"}, 
    { id: 1, name: "Farmers"}, 
    { id: 2, name: "Rural"}, 
    { id: 3, name: "Students"}, 
  ]);
  const onSubmit = (data) => {
    const scheme = {
      name: data.schemeName,
      totalBudget: data.amountBase * Number(data.amountUnit),
      description: data.schemeDes,
      departments: data.schemeDepartments,
      duration: `${data.durMonths && `${data.durMonths} Months `}${data.durYears} Years`,
    };
    // eslint-disable-next-line no-console
    console.log(scheme);
  };
 
  return (
    <div className={styles.addSchemePage}>
      <div className={styles.header}>
        <h1 className={styles.head}>Add Scheme</h1>
      </div>
      <div className={styles.schemeFormDiv}>
        <form className={styles.addSchemeForm} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="schemeName" className={styles.schemeName}>
            <h4>Scheme Name</h4>
            <input
              ref={register({ required: true })}
              name="schemeName"
              type="text"
              placeholder="Scheme Name"
            />
          </label>
          {errors.schemeName && <span className={styles.fieldError}>*This field is required</span>}
          <div className={styles.schemeBudget}>
            <h4>Total Budget</h4>
            <div className={styles.amountDiv}>
              <input
                type="number"
                ref={register({ required: true, min: 1 })}
                name="amountBase"
                className={styles.amountBase}
                placeholder="Base Amount"
              />
              <select
                ref={register({ required: true })}
                className={styles.amountUnit}
                name="amountUnit"
              >
                <option value="">Select Unit</option>
                <option value="10000000">Crores</option>
                <option value="100000">Lakhs</option>
                <option value="1000">Thousands</option>
              </select>
            </div>
          </div>
          {errors.amountBase && errors.amountBase.type === "min" && (
            <span className={styles.fieldError}>Invalid input.</span>
          )}
          {(errors.amountBase || errors.amountUnit) && (
            <span className={styles.fieldError}>*This field is required</span>
          )}
          <label htmlFor="schemeDes" className={styles.schemeDes}>
            <h4>Scheme Description</h4>
            <textarea
              ref={register({ required: true })}
              name="schemeDes"
              placeholder="Description"
            />
          </label>
          {errors.schemeDes && <span className={styles.fieldError}>*This field is required</span>}
          <div className={styles.schemeDep}>
            <h4>Departments</h4>
            <div className={styles.depDiv}>
              <Controller
                name="schemeDepartments"
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                render={props => 
                  <Select
                    {...props}
                    name="schemeDepartments"
                    options={department}
                    color="#4C7260"
                    // values={activeScheme}
                    clearable={false}
                    // onChange={updateSchemeChange}
                    style={{ 
                      width: "var(--dashboard-conversation-left-width)", 
                      borderRadius: "5px", 
                      borderColor: "#e4e4e4",
                    }}
                    required={true}
                    multi={true}
                    className={styles.selectDep}
                    dropdownPosition="auto"
                    dropdownGap={0}
                    searchable={true}
                    searchBy="name"
                    labelField="name" 
                    valueField="id"
                    placeholder={`Select Department`}
                  />
                }
              />
            </div>
          </div>
          {errors.schemeDep && <span className={styles.fieldError}>*This field is required</span>}
          <div className={styles.schemeDur}>
            <h4>Scheme Duration</h4>
            <div className={styles.durationDiv}>
              <input
                type="number"
                ref={register({ max: 11, min: 0 })}
                name="durMonths"
                className={styles.durMonths}
                placeholder="Months"
              />
              <input
                type="number"
                ref={register({ required: true, min: 1 })}
                name="durYears"
                className={styles.durYears}
                placeholder="Years"
              />
            </div>
          </div>
          {errors.durMonths &&
            (errors.durMonths.type === "max" || errors.durMonths.type === "min") && (
              <span className={styles.fieldError}>Invalid input.</span>
            )}
          {errors.durYears && <span className={styles.fieldError}>*This field is required</span>}
          <div className={styles.btnsDiv}>
            <button type="button" className={styles.cancelBtn}>
              <CancelLogo className={styles.btnLogo} />
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save
              <SaveLogo className={styles.btnLogo} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScheme;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
import styles from "./AddScheme.module.css";
import { ReactComponent as SaveLogo } from "../../assets/icons/icons8_checked_1.svg";
import { ReactComponent as CancelLogo } from "../../assets/icons/icons8_cancel.svg";

const AddScheme = () => {
  const { register, handleSubmit, errors } = useForm();
  const [department] = useState(["Finance", "Farmers", "Rural", "Students"]);
  const onSubmit = (data) => {
    const scheme = {
      name: data.schemeName,
      totalBudget: data.amountBase * Number(data.amountUnit),
      description: data.schemeDes,
      departments: data.schemeDep,
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
                ref={register({ required: true })}
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
              </select>
            </div>
          </div>
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
              {department.map((dep, i) => {
                return (
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label className={styles.department} id={i} key={i}>
                    <input
                      type="checkbox"
                      ref={register({ required: true })}
                      name="schemeDep"
                      value={dep}
                      className={styles.depInput}
                    />
                    <span>{dep}</span>
                  </label>
                );
              })}
            </div>
          </div>
          {errors.schemeDep && <span className={styles.fieldError}>*This field is required</span>}
          <div className={styles.schemeDur}>
            <h4>Scheme Duration</h4>
            <div className={styles.durationDiv}>
              <input
                type="number"
                ref={register({ max: 11 })}
                name="durMonths"
                className={styles.durMonths}
                placeholder="Months"
              />
              {/* {errors.durMonths && errors.password.type === "max" && (
                <span className={styles.fieldError}>
                  The value should be maximum upto 11 months.
                </span>
              )} */}
              <input
                type="number"
                ref={register({ required: true })}
                name="durYears"
                className={styles.durYears}
                placeholder="Years"
              />
            </div>
          </div>
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

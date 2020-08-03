import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Schemes.module.css";
import { useQuery } from "@apollo/client";
import getToast from "../../utils/getToast";
import USER from "../../graphql/queries/user";
import SchemeCard from "../../Components/SchemeCard/SchemeCard";
import DeleteScheme from "../../Components/SweetAlertModals/DeleteScheme/DeleteScheme";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import getModal from "../../utils/getModal";

const Schemes = () => {
  const [userType, setUserType] = useState(`MEMBER`);
  const { data } = useQuery(USER, {
    onCompleted: () => {
      console.log(data);
      if (data.user.type) setUserType(data.user.type);
    },
    onError: (error) => {
      const toast = getToast();
      if (error.graphQLErrors.length > 0) {
        toast.fire({
          title: error.graphQLErrors[0].message,
          icon: "error",
        });
      } else {
        toast.fire({
          title: "Some error occurred",
          icon: "error",
        });
      }
    },
  });

  const [schemes] = useState([
    {
      id: 1,
      name: "MNREGA",
      description:
        "Mahatma Gandhi Employment Guarantee Act 2005, is a labour law and social security measure that aims to guarantee the ‘right to work’. The aim is to enhance livelihood security in the rural areas by providing at least 100 days of wage employment in a financial year.",
      entity: "Central Government",
      sanctionedAmount: "45,000 Crores",
    },
    {
      id: 2,
      name: "Atmanirbhar Bharat Abhiyan - COVID-19 Relief Package",
      description:
        "The Atmanirbhar Bharat Abhiyan (meaning self-reliant India scheme) was announced in four tranches by the Union Finance Minister Nirmala Sitharaman in May 2020.The economic stimulus relief package announced by the government is touted to be worth Rs.20 Lakh crores. This includes the already announced Rs 1.70 lakh crore relief package, as the PMGKY, for the poor to overcome difficulties caused by the coronavirus pandemic and the lockdown imposed to check its spread.",
      entity: "Central Government",
      sanctionedAmount: "45,000 Crores",
    },
    {
      id: 3,
      name: "PM-Kisan Samman Nidhi Yojana",
      description:
        "Pradhan Mantri Kisan Samman Nidhi Yojana is implemented as a central sector scheme by the Government of India. This scheme was introduced to augment the source of income of many small and marginal farmers. The main objectives of PM-KISAN scheme are mentioned below: To provide income support to all eligible land-holding farmers and their families.PM-KISAN scheme also aims to supplement the financial needs of the farmers in procuring various inputs to ensure proper crop health and appropriate yields, commensurate with the anticipated farm income. The scheme is expected to increase the coverage of PM-KISAN to around 14.5 crore beneficiaries. It aims to cover around 2 crores more farmers with an estimated expenditure of Rs. 87,217.50 crores that will be funded by the Central Government for the year 2019-20",
      entity: "Central Government",
      sanctionedAmount: "45,000 Crores",
    },
    {
      id: 4,
      name: "Pradhan Mantri Shram Yogi Maan Dhan",
      description:
        "The Pradhan Mantri Shram Yogi Maan-Dhan is a voluntary and contributory pension scheme which aims to provide security and protection to the unorganised workers as well as to the old age group. The scheme is meant to benefit workers in the unorganised sector and this includes street vendors, rickshaw pullers, agricultural workers, mid-day meal workers, construction workers or workers in similar other occupations. There are an estimated 42 crore such unorganised workers in the country. Under this scheme, the beneficiary after attaining the age of 60 years would receive an assured monthly pension of Rs 3000/- per month and 50% of the pension shall be entitled to the spouse of the beneficiary as family pension after the death of the beneficiary.",
      entity: "Central Government",
      sanctionedAmount: "45,000 Crores",
    },
  ]);

  const handleDeleteFn = (id) => {
    const modal = getModal();
    modal.fire({
      ...DeleteScheme,
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            // eslint-disable-next-line
            alert(`YeeHaaww: Deleting ${id}`);
            resolve(true);
          }, 3000);
        });
      },
    });
  };

  return (
    <div className={styles.schemesPage}>
      <div className={styles.header}>
        <h1 className={styles.head}>Schemes</h1>
        {userType === `ROOT` && (
          <Link to="/dashboard/schemes/add">
            <button className={styles.addSchemeBtn} type="button">
              <Add className={styles.addScheme} />
              Add Scheme
            </button>
          </Link>
        )}
      </div>
      <div className={styles.schemes}>
        {schemes.map((scheme) => {
          return (
            <SchemeCard
              key={scheme.id}
              id={scheme.id}
              name={scheme.name}
              description={scheme.description}
              entity={scheme.entity}
              sanctionedAmount={scheme.sanctionedAmount}
              handleDeleteFn={handleDeleteFn}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Schemes;

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styles from "./Schemes.module.css";
import getToast from "../../utils/getToast";
import USER from "../../graphql/queries/user";
import SchemeCard from "../../Components/SchemeCard/SchemeCard";
import Loader from "../../Components/Loader/Loader";
import DeleteScheme from "../../Components/SweetAlertModals/DeleteScheme/DeleteScheme";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import getModal from "../../utils/getModal";

const defaultDesc =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

const Schemes = () => {
  // const [userType, setUserType] = useState(`MEMBER`);
  const { data, loading } = useQuery(USER, {
    // onCompleted: () => {
    //   console.log(data);
    //   if (data.user.type) setUserType(data.user.type);
    // },
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

  if (loading) return <Loader height="2em" />;

  // const [schemes] = useState([
  //   {
  //     id: 1,
  //     name: "MNREGA",
  //     description:
  //       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  //     entity: "Central Government",
  //     sanctionedAmount: "45,000 Crores",
  //   },
  //   {
  //     id: 2,
  //     name: "Jan Dhan Yojana",
  //     description:
  //       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  //     entity: "Central Government",
  //     sanctionedAmount: "45,000 Crores",
  //   },
  //   {
  //     id: 3,
  //     name: "Man Se Bnao Yojana",
  //     description:
  //       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  //     entity: "Central Government",
  //     sanctionedAmount: "45,000 Crores",
  //   },
  //   {
  //     id: 4,
  //     name: "Kuch Bhi Yojana",
  //     description:
  //       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  //     entity: "Central Government",
  //     sanctionedAmount: "45,000 Crores",
  //   },
  //   {
  //     id: 5,
  //     name: "Yayyyyy Yojana",
  //     description:
  //       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  //     entity: "Central Government",
  //     sanctionedAmount: "45,000 Crores",
  //   },
  // ]);

  const handleDeleteFn = (id) => {
    const modal = getModal();
    modal.fire({
      ...DeleteScheme,
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            // eslint-disable-next-line
            alert(`Deleting ${id}`);
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
        {data.user.type === `ROOT` && (
          <Link to="/dashboard/schemes/add">
            <button className={styles.addSchemeBtn} type="button">
              <Add className={styles.addScheme} />
              Add Scheme
            </button>
          </Link>
        )}
      </div>
      <div className={styles.schemes}>
        {data.user.schemes.map(({ scheme }) => {
          return (
            <SchemeCard
              key={scheme.id}
              id={scheme.id}
              name={scheme.name}
              description={scheme.description || defaultDesc}
              entity="Central Government"
              sanctionedAmount={scheme.budget}
              handleDeleteFn={handleDeleteFn}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Schemes;

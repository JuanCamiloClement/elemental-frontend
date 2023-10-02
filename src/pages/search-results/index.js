import Layout from "@/components/Layout";
import SearchItem from "@/components/SearchItem";
import styles from "./search-results.module.css";
import { useEffect, useState } from "react";

const SearchResultsPage = ({ users, query }) => {
  const [arrayToMap, setArrayToMap] = useState([]);

  useEffect(() => {
    const searchedString = query.toLowerCase();
    const arrayToShow = [];
    users.map((user) => {
      if (user.userName.toLowerCase() === searchedString
        || user.firstName.toLowerCase() === searchedString
        || user.lastName.toLowerCase() === searchedString
      ) {
        arrayToShow.push(user)
      }
    });
    setArrayToMap(arrayToShow);
  }, []);

  return (
    <Layout>
      <div className={styles.wholeContainer}>
        <h3>Search results</h3>
        <div className={styles.results}>
          {
            arrayToMap.map((user) => {
              return (
                <SearchItem
                  key={user._id}
                  image={user.avatar}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  userName={user.userName}
                />
              )
            })
          }
        </div>
      </div>
    </Layout>
  );
}

export default SearchResultsPage;

export const getServerSideProps = async ({ query }) => {
  const response = await fetch('http://localhost:8080/api/users');
  const { users } = await response.json();
  return {
    props: {
      users,
      query: query.searched,
    }
  }
}
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../Components/Common/Spinner";
import { User } from "../../Types";
import { BASE_URL } from "../../Utils/constants";
import Card from "../../Components/Common/Card";
import Button from "../../Components/Common/Button";

import './index.scss'

const Home: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [sortKey, setSortKey] = useState<"name" | "email">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchUsersAsync();
    }, []);

    const fetchUsersAsync = async () => {
        try {
            const response = await axios.get<User[]>(`${BASE_URL}/users`);
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (err) {
            console.error(err);
            setErrorMessage('Failed to fetch users. Please try again later.');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        let results = users.filter(user =>
            user.name.toLowerCase().includes(filter.toLowerCase()) ||
            user.email.toLowerCase().includes(filter.toLowerCase()) ||
            user.phone.includes(filter) ||
            user.website.includes(filter) ||
            `${user.address.street}, ${user.address.city}`.toLowerCase().includes(filter.toLowerCase())
        );

        if (sortKey && sortOrder) {
            results = results.sort((a, b) => {
                const keyA = a[sortKey];
                const keyB = b[sortKey];
                if (keyA < keyB) return sortOrder === "asc" ? -1 : 1;
                if (keyA > keyB) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }

        setFilteredUsers(results);
    }, [filter, sortKey, sortOrder, users]);

    const toggleSortOrder = () => {
        setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    };

    return (
        <div className="home-page">
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <h1 className="home-heading">User List</h1>
                    <div className="search-section">
                    <input
                        className="search-field"
                        type="text"
                        placeholder="Filter by any field"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    </div>
                    
                    <div className="filters-section">
                    
                    <Button handleClick={() => setSortKey("name")}>Sort by Name</Button>
                    <Button handleClick={() => setSortKey("email")}>Sort by Email</Button>
                    <Button handleClick={toggleSortOrder}>Toggle Sort Order: {sortOrder.toUpperCase()}</Button>
                    </div>
                    <div className="cards-section">
                        {filteredUsers.map(user => (
                            <Card user={user} key={user.id}/>
                        ))}
                    </div>

                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default Home;

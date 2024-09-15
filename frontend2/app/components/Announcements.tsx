import React, {useContext} from 'react';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {UserContext} from "@/app/UserContext";
import Notification from "@/app/components/Notification";

interface Announcement {
    title: string;
    content: string;
    date: string;
    category: "info" | "danger";
    active: boolean
}


function Announcements() {
    const {isUserLoggedIn: isLoggedIn} = useContext(UserContext);
    const getAnnouncements = async () => {
        const res = await axios.get<Announcement[]>("/api/public/announcements/all");
        return res.data[0] as Announcement;
    }

    const {data, error, isLoading} = useQuery({
        queryKey: ['announcement'],
        queryFn: getAnnouncements
    })


    return (
        <>
            {!isLoggedIn && (
                <Notification
                    key={"tip"}
                    message={"Login to save your progress"}
                    category={"info"}
                />
            )}


            {data && data.active && (
                <Notification key={"announcement"} message={data.content} category={data.category}
                />
            )}


        </>
    );
}

export default Announcements;
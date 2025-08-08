import { Layout } from "antd";
import { useState, useEffect } from "react";
const { Header } = Layout;
export const HeaderApp = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return (
        <>
            <Header className="header">
                <div className="demo-logo" style={{ width: 200 }}>
                    TO DO
                </div>
                <div className="header__left">
                    <span className="header__time">
                        {hours}:{minutes}
                    </span>
                    <span className="header__date">
                        {day}/{month}/{year.toString().slice(2)}
                    </span>
                </div>
            </Header>
        </>
    );
};

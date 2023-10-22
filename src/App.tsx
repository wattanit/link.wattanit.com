import React, {useEffect} from 'react';
import './App.css';
import urls from './urls.json';

function lookupUrl(path: string) {
    if (path[0] === "/") {
        path = path.slice(1);
    }

    if (path in urls) {
        // @ts-ignore
        return urls[path];
    } else {
        return "Not found";
    }
}

function App() {
    let redirectUrl = lookupUrl(window.location.pathname);

    useEffect(() => {
        return ()=>{
            if (redirectUrl === "Not found") {
                console.log("Short link not found: " + window.location.pathname);
                redirectUrl = "https://wattanit.com";
                console.log("Redirecting to " + redirectUrl);
                window.location.replace(redirectUrl);
            }else{
                console.log("Short link found: " + window.location.pathname);
                console.log("Redirecting to " + redirectUrl);
                window.location.replace(redirectUrl);
            }
        }
    }, []);

    return (
    <div className="App">
        <div className="Header">
            Wattanit.com <br/>
            <span className={"Main"}>URL Shortener Service</span>
        </div>
        <p/>
        <div>Current link {window.location.pathname}</div>
        <div>Redirecting to {redirectUrl}</div>
    </div>
    );
}

export default App;

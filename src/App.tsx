import React, {useEffect} from 'react';
import './App.css';
import urls from './urls.json';

function lookupUrl(path: string): string{
    if (path[0] === "/"){
        path = path.slice(1);
    }

    let lookup_path = path.toLowerCase();

    if (lookup_path in urls) {
        // @ts-ignore
        return urls[lookup_path];
    } else {
        return "Not found";
    }
}

type inputUrl = {
    shortUrl: string,
    isDev: boolean
}

function processUrl(url: string): inputUrl{
    if (url[0] === "?"){
        url = url.slice(1);
    }

    let path_items = url.split("&");

    let isDevMode = false;
    if (path_items.indexOf("dev") !== -1) {
        isDevMode = true;

        path_items.splice(path_items.indexOf("dev"),1);
    }

    return {
        shortUrl: (path_items.length > 0)? path_items[0] : "",
        isDev: isDevMode
    };
}

function App() {
    let urls = processUrl(window.location.search);
    let redirectUrl = lookupUrl(urls.shortUrl);

    useEffect(() => {
        return ()=>{
            if (redirectUrl === "Not found") {
                console.log("Short link not found: " + urls.shortUrl);
                console.log("Redirecting to https://wattanit.com");
                if (!urls.isDev){
                    window.location.replace("https://wattanit.com");
                }
            }
            else{
                console.log("Short link found: " + urls.shortUrl);
                console.log("Redirecting to " + redirectUrl);
                if (!urls.isDev){
                    window.location.replace(redirectUrl);
                }
            }
        }
    }, [urls]);

    return (
    <div className="App">
        <div className="Header">
            Wattanit.com <br/>
            <span className={"Main"}>URL Shortener Service</span>
        </div>
        <p/>
        {urls.isDev && <div>Development mode: No redirection will occur</div>}
        <div>Current link {urls.shortUrl}</div>
        <div>Redirecting to {redirectUrl}</div>
    </div>
    );
}

export default App;

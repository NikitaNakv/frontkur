import Register from "./Register";

export default class Client{

    login(name,password){
        let xhr = new XMLHttpRequest();
        let url = "http://env-8452931.mircloud.host/course/rest/loginCourse";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                let result = JSON.parse(xhr.responseText);
                console.log("Access:" + result.access);
                if (result.status === "pass") {
                    localStorage.setItem("authKey", result.authKey);
                    localStorage.setItem("username", name);
                    localStorage.setItem("auth", "pass");
                    window.location.assign("./profile");
                } else {
                    let regis = new Register();
                    regis.upd(result.error);
                }
            } else {

            }
        };
        let data = JSON.stringify({username:name,password:password});
        console.log(data);
        xhr.send(data);
    }

    register(name,password,email){
        let xhr = new XMLHttpRequest();
        let url = "http://env-8452931.mircloud.host/course/rest/registerCourse";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.status === "pass"){
                    let regis = new Register();
                    regis.upd("successful");
                } else{
                    let regis = new Register();
                    regis.upd(response.error);
                }
            }
        };
        let data = JSON.stringify({username:name,password:password,email:email});
        xhr.send(data);
    }

    registerCheck(email,code){
        let xhr = new XMLHttpRequest();
        let url = "http://env-8452931.mircloud.host/course/rest/registerCheckCourse";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.status === "pass"){
                    window.location.assign("./login");
                } else{
                    let regis = new Register();
                    regis.upd(response.error);
                }
            }
        };
        let data = JSON.stringify({emailCheck:code,email:email});
        xhr.send(data);
    }

    auth(name,code){
        let prom = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/authCourse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let result = JSON.parse(xhr.responseText);
                        if (result.status === "pass") {
                            localStorage.setItem("auth","pass");
                            resolve(result);
                        }
                        else {
                            localStorage.setItem("auth", "denied");
                            window.location.assign("./login");
                        }
                    } else {
                        window.location.assign("./login");
                    }
                }
            };
            let data = JSON.stringify({username: name, authKey: code});
            console.log(data);
            xhr.send(data);
        });
        let onResolved = () => localStorage.setItem("auth","pass");
        setTimeout(()=>prom.then(onResolved),100);
        return prom;
    }



    logout(name,code){
        let xhr = new XMLHttpRequest();
        let url = "http://env-8452931.mircloud.host/course/rest/logoutCourse";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify({username:name,authKey:code});
        xhr.send(data);
        localStorage.clear();
        window.location.assign("./login");
    }


    changeEmail(name,password,newEmail){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/changeEmail";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("new-email", newEmail);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            resolve(newEmail);
                        } else {
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username: name, password: password});
            xhr.send(data);
        });
        return result;
    }

    changePassword(name,password,newPassword){
        let xhr = new XMLHttpRequest();
        let url = "http://env-8452931.mircloud.host/course/rest/changePassword";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("new-password", newPassword);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    let response = JSON.parse(xhr.responseText);
                    if (response.status === "pass"){
                        let regis = new Register();
                        regis.upd("successful");
                    } else{
                        let regis = new Register();
                        regis.upd(response.error);
                    }
                }
            }
        };
        let data = JSON.stringify({username:name,password:password});
        xhr.send(data);
    }

    getInfo(username,authKey){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getInfo";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let info = JSON.parse(xhr.responseText);
                        resolve(info);
                    }
                }
            };
            let data = JSON.stringify({username:username,authKey:authKey});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }


    getChats(name,code){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getChats";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            const array = response.chats;
                            resolve(array);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            xhr.send(data);
        });
        return result;
    }

    getChatMessages(name,code,chatname){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getChatMessages";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("chatname", chatname);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            const messages = response.messages.reverse();
                            resolve(messages);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            xhr.send(data);
        });
        return result;
    }


    sendMessage(name,code,chatname,text){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/sendMessage";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("creator-username",name);
            xhr.setRequestHeader("creator-auth-key",code);
            xhr.setRequestHeader("chatname",chatname);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            resolve(response);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({text:text});
            xhr.send(data);
        });
        return result;
    }


    createChat(name,code,chatname){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/createChat";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("creator-username",name);
            xhr.setRequestHeader("creator-auth-key",code);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            resolve(response);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({chatname:chatname});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }


    joinChat(name,code,chatname){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/joinChat";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("joiner-username",name);
            xhr.setRequestHeader("joiner-auth-key",code);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            resolve(response);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({chatname:chatname});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

    getChatRequests(name,code,chatname){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getChatRequests";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("admin-username",name);
            xhr.setRequestHeader("admin-auth-key",code);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            let requests = response.requests;
                            resolve(requests);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({chatname:chatname});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }


    acceptChatRequest(name,code,joinerName,chatname){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/acceptChatRequest";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("admin-username",name);
            xhr.setRequestHeader("admin-auth-key",code);
            xhr.setRequestHeader("joiner-username",joinerName);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            resolve(response);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({chatname:chatname});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

    getAdminedChats(name,code){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getAdminedChats";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            let chats = response.chats;
                            resolve(chats);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
    });
    return result;
    }

    getUserItems(name,code){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getUserItems";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            let items = response.items;
                            resolve(items);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

    getEquipedItem(name,code){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getEquipedItem";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            let itemname = response.itemname;
                            resolve(itemname);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }


    equipItem(name,code,itemname){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/equipItem";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("itemname", itemname);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {

                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

    getUserCases(name,code){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getUserCases";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            let cases = response.cases;
                            resolve(cases);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

    openCase(name,code,casetype){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/openCase";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("casetype", casetype);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            let itemname = response.itemname;
                            resolve(itemname);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }


    getHeroStats(name,code){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getHeroStats";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            resolve(response);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

    changeHeroName(name,code,newName){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/changeHeroName";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("new-heroname", newName);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            resolve(response);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

    getAllWorlds(name,code){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getAllWorlds";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            let worlds = response.worlds;
                            resolve(worlds);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

    getWorldInfo(name,code,worldName){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/getWorldInfo";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("worldname", worldName);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            resolve(response);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

    worldBattle(name,code,worldName){
        let result = new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            let url = "http://env-8452931.mircloud.host/course/rest/worldBattle";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("worldname", worldName);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "pass") {
                            let log = response.battleLog;
                            resolve(log);
                        }else{
                            let regis = new Register();
                            regis.upd(response.error);
                        }
                    }
                }
            };
            let data = JSON.stringify({username:name,authKey:code});
            console.log(data);
            xhr.send(data);
        });
        return result;
    }

}
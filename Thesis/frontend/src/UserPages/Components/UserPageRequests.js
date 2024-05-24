import axios from 'axios';
const backendHost = process.env.REACT_APP_BACKEND_API_HOST

export const getUserInfo = async (email) =>
{
    try
    {
        let url = backendHost + "/user";

        let response = await axios.get(url, 
        {
            params:{
                email: email
            }
        })
        
        if(response.data.length == 0)
            {
                console.log("get_user_info. No data.")
                return null
            }

        return response.data[0]
    }
    catch(error)
    {
        console.log(error.message);
    }

    return null
}

export const getUserInfoById = async (id) =>
    {
        try
        {
            let url = backendHost + "/user/byId";
    
            let response = await axios.get(url, 
            {
                params:{
                    id: id
                }
            })
            
            if(response.data.length == 0)
                {
                    console.log("getUserInfoById. No data.")
                    return null
                }
    
            return response.data
        }
        catch(error)
        {
            console.log(error.message);
        }
    
        return null
    }

export const addUser = (
    token,
    email,
    name,
    surname) =>
{
    try
    {
        let url = backendHost + "/user";
        let bearer = 'Bearer ' + token

        axios.post(url, 
        {
            email: email,
            name: name,
            surname: surname
        },
        {
            headers: {
                authorization: bearer
            }
        }).then((response) => {
            console.log('[DEBUG] addUser. status: ' + response.status.toString())
        })
    }
    catch(error)
    {
        console.log(error.message);
    }
}

export const updateUser = (
    token,
    email,
    name,
    surname,
    isVarified) =>
{
    try
    {
        let url = backendHost + "/user/update";
        let bearer = 'Bearer ' + token

        axios.post(url, 
        {
            email: email,
            name: name,
            surname: surname,
            isVarified: isVarified
        },
        {
            headers: {
                authorization: bearer
            }
        }).then((response) => {
            console.log('[DEBUG] addUser. status: ' + response.status.toString())
        })
    }
    catch(error)
    {
        console.log(error.message);
    }
}

export const getWallets = async (id) =>
    {
        try
        {
            let url = backendHost + "/wallets";
    
            let response = await axios.get(url, 
            {
                params:{
                    id: id
                }
            })
            
            if(response.data.length == 0)
                {
                    console.log("getWallets. No data.")
                    return null
                }

            let wallets = []

            console.log(response.data)
            for(let i = 0; i < response.data.length; i++)
            {
                wallets.push(response.data[i].wallet)   
            }
            
            return wallets
        }
        catch(error)
        {
            console.log(error.message);
        }
    
        return null
    }

    export const userWalletExists = async (wallet) =>
        {
            try
            {
                let url = backendHost + "/wallets/exists";
        
                let response = await axios.get(url, 
                {
                    params:{
                        wallet: wallet
                    }
                })
                
                if(response.data.length == 0)
                    {
                        console.log("getWallets. No data.")
                        return null
                    }

                return response.data.exists
            }
            catch(error)
            {
                console.log(error.message);
            }
        
            return null
        }
    
    export const addWallet = (
        token,
        id,
        wallet) =>
    {
        try
        {
            let url = backendHost + "/wallets";
            let bearer = 'Bearer ' + token
    
            axios.post(url, 
            {
                user_id: id,
                wallet: wallet
            },
            {
                headers: {
                    authorization: bearer
                }
            }).then((response) => {
                console.log('[DEBUG] addWallet. status: ' + response.status.toString())
            })
        }
        catch(error)
        {
            console.log(error.message);
        }
    }
import { useState, useCallback, useRef, useEffect } from 'react';

//This hook handles the requests to the server and LoadingSpinner and ErrorModals components
export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    //If user switches the page fast, before we get the request's response, we don't need to update a state of unmounted component
    //Ref is not updating with each re-render cycle
    const activeHttpRequests = useRef([]);

    //Send a request to a server
    //UseCallback prevents the infinite loops
    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true);
            //Create new instance to control our request (we need to implement a flag for this request to a fetch(), and then in a case of unmounting this component, the request should be aborted. So we save all the requests in the Refs array and they will not be re-create with each re-render of our component)
            const httpAbortCtrll = new AbortController();
            //Current controls our array (of AbortControllers)
            activeHttpRequests.current.push(httpAbortCtrll);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrll.signal, //ReadOnly property to communicate with a request and abort it if need it
                });

                const responseData = await response.json();
                //We need to clear up Abort Controller, that has been setup for this request
                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrll
                );
                //Check the response status and throw an error for 4-- and 5--
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                //We need to return the response for our components to use the data
                return responseData;
            } catch (err) {
                setIsLoading(false);
                setError(err);
                throw err;
            }
        },
        []
    );

    //Function, that clear the Error, that we canprovide to our components (component shold set it on closing of an error modal)
    const clearError = () => {
        setError(null);
    };
    //useEffect will be executed just one time when the component will be onmounted (we use return from useEffect). In this case we need to clear up our array with requests and abort them (we don't want to change state on onmounted components, when we'll get a response)
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) =>
                abortCtrl.abort()
            ); //abort method stops the request
        };
    }, []);
    return { isLoading, error, sendRequest, clearError };
};

```javascript
# useQuery

1. Fetcher 함수 만들기
2. useQuery 쓰기
3. 뿌리기

const fetcher = () => {
    return axios.get("http:....");
}

const { data, isLoading, isError } = useQuery("rank", fetcher);

return <>{data.map((value, index) => <div>{value.title}</div>)}<>;

# useMutation

1. async 함수 만들기
2. useMutation 쓰기
3. useMutation 안에서 함수 만들기

const [ successTodo, setSuccessTodo]= useSatte(false)

const postTodo = async(data) => {
    const asyncPostTodo = await axios.post("url", {data})
    return asyncPostTodo;
}

const { mutate } = useMutation(postTodo, {
    onSuccess: (res) => {
        alert("성공");
        setSuccessTodo(res);
    }.
    onError: (error) => {
        alert(error.message);
    }
})


return <button onClick={() => {
    mutate(data)
}}></button>
```

const [profileImg, setProfileImg] = useState("");
const [nickName, setNickName] = useState("");
const [newNick, setNewNick] = useState("");
const queryClient = useQueryClient();
const myInfoFn = async () => {
  return await SignAPI.myinfo();
};
const { error, loading } = useQuery([queryKeys.MYINFO], myInfoFn, {
  staleTime: 6000,
  cacheTime: 60 * 60 * 1000,
  onSuccess: (response) => {
    setNickName(response?.data?.nickName);
    setProfileImg(response?.data?.profileImg);
  },
  onError: (error) => {
    console.log(error);
  },
});
const updateInfo = useMutation((formData) => SignAPI.updateinfo(formData), {
  onSuccess: () => {
    queryClient.invalidateQueries(queryKeys.MYINFO);
  },
});
const onUpdateHandler = (e) => {
  const formData = new FormData();
  const imgSrc = e.target.files[0];
  if (imgSrc) setProfileImg(imgSrc);
  formData.append("username", nickName);
  formData.append("image", profileImg);
  updateInfo(formData);
};

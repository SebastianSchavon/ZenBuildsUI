import { useEffect, useState } from "react";
import axios from "axios";
import {
    BuildDiv,
    Content,
    Title,
    ContentHeader,
    Page,
    UserImg,
    UsernameDisplay
} from "./pages-elements/global-homeElements";
const Home = () => {
    

    const [HomeFeed, setHomeFeed] = useState([]);
    const [LikeCount, setLikeCount] = useState([]);
    const [visibillity, setVisibillity] = useState(false);
    useEffect(() => {
        getHomeFeed();
    },[null])

    const onSubmit = async (e) => {
        LikeBuild(e);
    }
    const onTitleClick = (e) => {
        setVisibillity(!visibillity)
    }

    const getHomeFeed = async () => {
        await axios.get('http://localhost:4000/builds/getAuthenticatedUserFeed', {
            headers: {
                'Content-Type': 'application/json',
                // use Token saved in localstorage
                'Authorization': localStorage.getItem('token')
            }
          })
          .then(function (response) {
            console.log('Success:', response.data);
            setHomeFeed(response.data)
          })
          .catch(function (error) {
            console.log(error)
            // display error message here

          });
    };
    
    const LikeBuild = async (buildId, data) => {
        console.log(buildId)
        await axios
            .put("http://localhost:4000/likes/toggleLike/" + buildId, data, {
                headers: {
                    "Content-Type": "application/json",
                    // use Token saved in localstorage
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(function (response) {
                console.log("Success:", response.data);
                setLikeCount(response.data)
            })
            .catch(function (error) {
                console.log(error);
                
            });
    };

    return (
        <Page>
            {HomeFeed.map((build, index) => (
                 <div>
                 <BuildDiv >
                     <UserImg  src="https://www.logolynx.com/images/logolynx/be/beb78778027c8c3d423794c882afe582.jpeg" />
                     <ContentHeader onClick={() => onTitleClick()} >
                         <UsernameDisplay>
                             {build.user.username} 
                         </UsernameDisplay>
                         <Title >
                             {build.title}
                         </Title>
                         <Title>
                             {build.playerRace} vs {build.opponentRace}
                         </Title>
                     </ContentHeader>
                     <Content value={visibillity}>{build.content}</Content>
                     <ContentHeader>
                         <Title>
                         {build.published}
                         </Title>
                         <Title onClick={() => onSubmit(build.id)}>
                         ❤ {build.likesCount} 
                         </Title>
                     </ContentHeader>
                 </BuildDiv>
             </div>

            ))}
        </Page>
      );
}
 
export default Home;

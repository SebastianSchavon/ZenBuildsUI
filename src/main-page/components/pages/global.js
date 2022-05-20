import { useEffect, useState } from "react";
import axios from "axios";
import { BuildDiv, Content, Title, ContentHeader, Likes, Page, PublishedDate } from "./pages-elements/global-homeElements";

const Global = () => {

    const [GlobalFeed, setGlobalFeed] = useState([]);
    
    useEffect(() => {
        getGlobalFeed();
    },[null])

    const onSubmit = async (e) => {
        LikeBuild(e);
    }

    const getGlobalFeed = async () => {
        await axios.get('http://localhost:4000/builds/getAllBuilds', {
            headers: {
                'Content-Type': 'application/json',
                // use Token saved in localstorage
                'Authorization': localStorage.getItem('token')
            }
          })
          .then(function (response) {
            console.log('Success:', response.data);
            setGlobalFeed(response.data)
          })
          .catch(function (error) {
            console.log(error)
            // display error message here

          });
    };

    const LikeBuild = async (buildId) => {
        await axios.put('http://localhost:4000/likes/toggleLike/' + buildId, {
            headers: {
                // use Token saved in localstorage
                'Authorization': localStorage.getItem('token')
            }
          })
          .then(function (response) {
            console.log('Success:', response.data);
            console.log(buildId)
            
          })
          .catch(function (error) {
            console.log(error)
            console.log(localStorage.getItem('token'))
            console.log('http://localhost:4000/likes/toggleLike/' + buildId)
            // display error message here

          });
    };

    return (
        <Page>
            {GlobalFeed.map(build => (
                <div>
                <BuildDiv>
                    <ContentHeader>
                    <Title>{ build.title }</Title>
                    <Title>{ build.user.username }</Title>
                    <Title>{ build.playerRace } vs { build.opponentRace }</Title>
                    </ContentHeader> 
                    <Content>{ build.content }</Content>
                    <ContentHeader>
                        <PublishedDate>
                            { build.published }
                        </PublishedDate>
                        <Likes onClick={() => onSubmit(build.id)}>❤ { build.likesCount }</Likes>
                    </ContentHeader>
                    
                </BuildDiv>

                </div>

            ))}
        </Page>
      );
}
 
export default Global;

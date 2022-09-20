import styled from 'styled-components';
import { Profile, PlanFlow } from 'domains';

const Myplants: React.FC = () => {
    return (
        <StyledMyplantsContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <PlanFlow
                    data={[
                        {
                            plantName: '몬스테라 페라로사',
                            plans: [
                                {
                                    date: '2022-09-17',
                                    text: '몬스테라 테사로사에게 비료가 필요해요',
                                },
                                {
                                    date: '2022-09-01',
                                    text: '몬스테라 테사로사에게 물이 필요해요',
                                },
                                {
                                    date: '2022-10-02',
                                    text: '몬스테라 테사로사에게 비료가 필요해요',
                                },
                            ],
                        },
                        {
                            plantName: '아레카이자',
                            plans: [
                                { date: '2022-09-16', text: '아레카야자에게 비료가 필요해요' },
                                { date: '2022-09-22', text: '아레카야자에게 비료가 필요해요' },
                                { date: '2022-09-29', text: '아레카야자에게 물이 필요해요' },
                            ],
                        },
                        {
                            plantName: '아레카이자',
                            plans: [
                                { date: '2022-09-1', text: '아레카야자에게 물이 필요해요' },
                                { date: '2022-09-9', text: '아레카야자에게 비료가 필요해요' },
                                { date: '2022-09-16', text: '아레카야자에게 물이 필요해요' },
                            ],
                        },
                    ]}
                    currentDate={new Date()}
                />
            </StyledContextContainer>
        </StyledMyplantsContainer>
    );
};

const StyledProfileBlock = styled.div`
    position: relative;
    width: 85%;
    padding-bottom: 150%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 73%;
    height: 5000px;
    margin-left: 2%;
`;

const StyledMyplantsContainer = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
`;

export default Myplants;

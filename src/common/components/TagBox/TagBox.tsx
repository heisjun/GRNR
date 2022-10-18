import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectedTag from './SelectedTag';
import { ITagBox } from './TagBox.type';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const TagBox: React.FC<ITagBox> = (props) => {
    const { realsetGetTag, realvalue } = props;

    const [currentItem, setCurrentItem] = useState<string[]>([]);
    const [textValue, setTextValue] = useState('');
    const [array, setArray] = useState<{ tagName: string }[]>(realvalue);
    const handleSetValue = (e: any) => {
        setTextValue(e.target.value);
    };

    const handleCurrentTag = (option: string, del: { tagName: string }) => {
        if (array.includes(del)) {
            setCurrentItem((prev) => {
                const arr = [...prev];
                arr.splice(prev.indexOf(option), 1);
                return arr;
            });
            setArray((prev) => {
                const arr = [...prev];
                arr.splice(prev.indexOf(del), 1);
                return arr;
            });
        } else {
            setCurrentItem((prev) => [...prev, option]);
            const newItem = { tagName: option };
            setArray((prev) => [...prev, newItem]);
        }
    };

    const onClick = () => {
        handleCurrentTag(textValue, { tagName: textValue });
        setTextValue('');
    };

    const onKeyPress = (e: { key: string }) => {
        if (e.key == 'Enter') {
            onClick();
        }
    };

    const sendTag = () => {
        realsetGetTag(array);
    };

    useEffect(() => {
        sendTag();
    }, [currentItem, array]);

    return (
        <StyledTagBoxContainer>
            <SelectedTag realdata={realvalue} realsetClear={setArray} />
            <div>
                <StyledFixText>#</StyledFixText>
                <StyledInputHashTag>
                    <StyledInput
                        type="text"
                        placeholder="키워드"
                        value={textValue}
                        onKeyPress={onKeyPress}
                        onChange={(e) => {
                            handleSetValue(e);
                        }}
                    ></StyledInput>
                    <StyledInputBtn
                        onClick={() => {
                            handleCurrentTag(textValue, { tagName: textValue });
                            setTextValue('');
                        }}
                    >
                        입력
                    </StyledInputBtn>
                </StyledInputHashTag>
            </div>
        </StyledTagBoxContainer>
    );
};

const StyledTagBoxContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-bottom: 20px;
    }
`;

const StyledInputHashTag = styled.div`
    background-color: lightgray;
    color: gray;
    margin-right: 5px;
    margin-top: 5px;
    padding: 5px 5px 5px 17px;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 300;
    display: flex;
    width: 50px;
`;

const StyledInput = styled.input`
    border: none;
    background-color: lightgray;
    color: gray;
    margin-right: 5px;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 300;
    width: 90%;
`;

const StyledInputBtn = styled.div`
    font-size: 15px;
    display: flex;
    padding: 0;
    display: none;
`;

const StyledFixText = styled.div`
    position: absolute;
    padding: 10px 5px 5px 5px;
    color: gray;
`;

export default TagBox;

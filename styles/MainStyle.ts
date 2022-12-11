import styled from "styled-components";


export const MainWrap = styled.div`

    @media only screen and (min-width: 600px) {

        .lost {
            text-align: center;
            color: red;
            margin-top: 40px;
        }

        .win {
            text-align: center;
            color: blue;
            margin-top: 40px;
        }
        .gameOn {
        width: 100% ;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            margin-top: 140px;
        }

        .wordDef {
            width: 560px;
            margin-top: 40px;
            font-size: 20px;
        }
        .puzzleGrid {
            
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            gap: 4px;
            list-style: none;

            li{
                width: 64px;
                height: 64px;
                font-size: 24px;
                border: 1px solid black;
                border-radius: 12px;
                padding-top: 20px;
                text-align: center;
            }

            li:first-child {
                pointer-events: none;
            }

            li:last-child {
                pointer-events: none;
            }

            

            .selectedOption {
                width: 64px;
                height: 64px;
                font-size: 24px;
                border: 2px solid #008aff;
                border-radius: 12px;
                padding-top: 20px;
                text-align: center;
            }
        }


        .answers {
            
            max-width: 520px;
            margin-top: 28px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            flex-direction: row;
            gap: 4px;
            list-style: none;

            li{
                width: 64px;
                height: 64px;
                font-size: 24px;
                border: 2px solid white;
                background-color: #008aff;
                color: white;
                border-radius: 12px;
                padding-top: 16px;
                text-align: center;
            }

            
         
        }

        .warning{
            margin-top: 40px;
            padding: 20px;
            font-size: 18px;
            color: white;
            text-align: center;
            background-color: #ca2b2b;
            transition: 0.500s;
        }

        .warning-invinsible {
            transition: 0.500s;
            opacity: 0;
            margin-top: 40px;
            padding: 20px;
            font-size: 18px;
            color: white;
            text-align: center;
            background-color: #ca2b2b;
        }

        

        

        
    }
        }



        @media only screen and (max-width: 600px) {
            padding: 20px 32px;

.lost {
    text-align: center;
    color: red;
    margin-top: 40px;
}

.win {
    text-align: center;
    color: blue;
    margin-top: 40px;
}
.gameOn {
    
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

h2 {
    margin-top: 140px;
}

.wordDef {
    width: 100%;
    margin-top: 40px;
    font-size: 20px;
}
.puzzleGrid {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 4px;
    list-style: none;
  

    li{
        width: 44px;
        height: 44px;
        font-size: 24px;
        border: 2px solid black;
        border-radius: 12px;
        padding-top: 8px;
        text-align: center;
    }

    li:first-child {
        pointer-events: none;
    }

    li:last-child {
        pointer-events: none;
    }

    

    .selectedOption {
        width: 44px;
        height: 44px;
        font-size: 24px;
        border: 2px solid #008aff;
        border-radius: 12px;
        padding-top: 8px;
        text-align: center;
    }
}


.answers {
    
    max-width: 520px;
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    gap: 4px;
    list-style: none;

    li{
        width: 52px;
        height: 52px;
        font-size: 24px;
        border: 2px solid white;
        background-color: #008aff;
        color: white;
        border-radius: 12px;
        padding-top: 10px;
        text-align: center;
    }

    
 
}

.warning{
    margin-top: 40px;
    padding: 20px;
    font-size: 18px;
    color: white;
    text-align: center;
    background-color: #ca2b2b;
    transition: 0.500s;
}

.warning-invinsible {
    transition: 0.500s;
    opacity: 0;
    margin-top: 40px;
    padding: 20px;
    font-size: 18px;
    color: white;
    text-align: center;
    background-color: #ca2b2b;
}






}
}
    
`
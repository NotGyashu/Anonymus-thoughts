import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import CardMembershipTwoToneIcon from "@mui/icons-material/CardMembershipTwoTone";  
export const Header = () => {
    
    
  return (
    <div class="h-[10vh] bg-[#2d0d4a] flex items-center text-white justify-around">
      <span class="font-cursive text-3xl">Anonymus thoughts</span>
      <form class="flex bg-[#110229]  rounded justify-between items-center relative border h-[70%]">
        <div class="hover:border-white border h-[100%] border-r-[1px] border-r-white">
          <select
            id="category"
            name="category"
            required
            class="block appearance-none h-full bg-[#110229]  px-4  pr-8  leading-tight focus:outline-none   transition duration-500 ease-in-out"
          >
            <option value="" disabled selected hidden>
              Category
            </option>
            <option value="dark" class=" hover:bg-#2d0d4a">
              Dark
            </option>
            <option value="laugh" class=" hover:bg-#2d0d4a">
              Laugh
            </option>
            <option value="sad" class=" hover:bg-#2d0d4a">
              Sad
            </option>
            <option value="cringe" class=" hover:bg-#2d0d4a">
              Cringe
            </option>
          </select>
          <KeyboardArrowDownTwoToneIcon htmlColor="white"/>
        </div>

        <input class="bg-inherit focus:outline-none w-[30vw] px-2 text-white"></input>
        <div class=" border h-[100%] flex items-center px-2 bg-[#3e2158]">
          <SearchTwoToneIcon />
        </div>
      </form>
      <div class="flex gap-5">
        <HelpOutlineTwoToneIcon />
        <DarkModeTwoToneIcon />
        <CardMembershipTwoToneIcon />
      </div>
    </div>
  );
};

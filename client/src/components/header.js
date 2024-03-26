import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import CardMembershipTwoToneIcon from "@mui/icons-material/CardMembershipTwoTone";
export const Header = () => {
  return (
    <div class="h-[10vh] bg-[#877f90] flex items-center text-white justify-between lg:px-4 md:px-2 px-1 ">
      <span class="font-cursive lg:text-3xl md:text-xl text-lg">
        Anonymus thoughts
      </span>
      <form class=" bg-[#110229] hidden md:flex   rounded justify-between items-center relative border lg:h-[70%]  h-[60%]">
        <div class="hover:border-white border h-[100%] flex items-center justify-center border-r-[1px] border-r-white">
          <select
            id="category"
            name="category"
            required
            class="block appearance-none h-full w-full bg-[#110229]   px-1 leading-tight focus:outline-none text-sm transition duration-500 ease-in-out"
          >
            <option value="" disabled selected hidden>
              Category
            </option>
            <option value="dark" class=" hover:bg-#2d0d4a w-full">
              Dark
            </option>
            <option value="laugh" class=" hover:bg-#2d0d4a w-full">
              Laugh
            </option>
            <option value="sad" class=" hover:bg-#2d0d4a w-full">
              Sad
            </option>
            <option value="cringe" class=" hover:bg-#2d0d4a w-full">
              Cringe
            </option>
          </select>
          <KeyboardArrowDownTwoToneIcon htmlColor="white" />
        </div>

        <input class="bg-inherit focus:outline-none w-[30vw] text-xs px-2 text-white"></input>
        <div class=" border h-[100%] flex items-center px-2 bg-[#3e2158]">
          <SearchTwoToneIcon fontSize="small" />
        </div>
      </form>
      <div class="flex lg:gap-5 gap-2">
        <HelpOutlineTwoToneIcon />
        <DarkModeTwoToneIcon />
        <CardMembershipTwoToneIcon />
      </div>
    </div>
  );
};

import AddBookForm from "../components/AddBookForm";
import { useAuth } from "react-use-auth";

export default function AddBook(props) {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="container mx-auto w-full">
      <div className="container mx-auto px-6 flex relative">
        <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative lg:pt-32 sm:pt-0 lg:pb-40 sm:pb-2">
          <span className="w-20 h-2 mb-12"></span>
          <h1 className="text-6xl sm:text-8xl flex flex-col leading-none font-bold text-default">
            Add a Book{" "}
            <span className="text-4xl mt-2 font-light text-foreground-default sm:text-7xl leading-tight">
              {isAuthenticated()
                ? `Hi ${user.nickname}, add to your book shelf`
                : "You're not logged in 😢 Don't worry, you can still add a book to the guest shelf ✨✨✨"}
            </span>
          </h1>
          <p className="text-sm pt-3 sm:text-base text-gray-500 pr-3">
            Use the form below to add your book.
          </p>
        </div>
        <div
          className="mt-8 hidden sm:block sm:w-1/3 lg:w-2/5 relative bg-local bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: "url(/undraw-book-ball.png)" }}
        ></div>
      </div>
      <AddBookForm />
    </div>
  );
}

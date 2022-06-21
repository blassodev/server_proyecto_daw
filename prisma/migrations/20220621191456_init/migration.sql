-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookAuthor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "BookAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentedBook" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "RentedBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieDirector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "MovieDirector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentedMovie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "movieDirectorId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "RentedMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnMovies" (
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresInMinutes" INTEGER NOT NULL DEFAULT 4320,

    CONSTRAINT "UsersOnMovies_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "RentedBook" ADD CONSTRAINT "RentedBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedBook" ADD CONSTRAINT "RentedBook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "BookAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedMovie" ADD CONSTRAINT "RentedMovie_movieDirectorId_fkey" FOREIGN KEY ("movieDirectorId") REFERENCES "MovieDirector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnMovies" ADD CONSTRAINT "UsersOnMovies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnMovies" ADD CONSTRAINT "UsersOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "RentedMovie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

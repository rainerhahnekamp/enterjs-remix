-- CreateTable
CREATE TABLE "Talk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "slidesUrl" TEXT,
    "recordingUrl" TEXT,

    CONSTRAINT "Talk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Talk_userId_key" ON "Talk"("userId");

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

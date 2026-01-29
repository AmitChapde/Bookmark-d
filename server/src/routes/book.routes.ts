import { Router } from "express";

import {
  getBookByIdController,
  getAllBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/book.controller";
import { protectController } from "../controllers/auth.controller";

const router = Router();
router.use(protectController);

router.route("/").get(getAllBooksController).post(createBookController);

router
  .route("/:bookId")
  .get(getBookByIdController)
  .patch(updateBookController)
  .delete(deleteBookController);

export default router;

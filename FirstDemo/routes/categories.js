const express = require('express');
const router = express.Router();

const categories = [
  { id: 1, name: 'Điện tử' },
  { id: 2, name: 'Thời trang' },
  { id: 3, name: 'Sách' }
];

// Lấy tất cả các danh mục
router.get('/', (req, res) => {
  res.send('Danh sách các danh mục:\n' + categories.map(category => category.name).join('\n'));
});

// Lấy một danh mục cụ thể theo ID
router.get('/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return res.status(404).send('Không tìm thấy danh mục');
  }

  res.send(`ID Danh mục: ${category.id}, Tên: ${category.name}`);
});

// Tạo một danh mục mới
router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Tên là bắt buộc để tạo danh mục mới');
  }

  const newCategory = {
    id: categories.length + 1,
    name: name
  };

  categories.push(newCategory);

  res.status(201).send(`Tạo danh mục thành công. ID: ${newCategory.id}, Tên: ${newCategory.name}`);
});

// Cập nhật một danh mục theo ID
router.put('/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const { name } = req.body;

  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return res.status(404).send('Không tìm thấy danh mục');
  }

  category.name = name;

  res.send(`Cập nhật danh mục thành công. ID: ${category.id}, Tên cập nhật: ${category.name}`);
});

// Xóa một danh mục theo ID
router.delete('/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const index = categories.findIndex((cat) => cat.id === categoryId);

  if (index === -1) {
    return res.status(404).send('Không tìm thấy danh mục');
  }

  const deletedCategory = categories.splice(index, 1)[0];

  res.send(`Xóa danh mục thành công. ID: ${deletedCategory.id}, Tên: ${deletedCategory.name}`);
});

module.exports = router;

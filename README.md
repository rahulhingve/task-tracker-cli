# task-tracker-cli

```markdown
# Task Tracker CLI
https://roadmap.sh/projects/task-tracker
A command-line interface tool for managing your tasks efficiently.

## Installation

git clone https://github.com/rahulhingve/task-tracker-cli
cd task-tracker-cli

```bash
npm install -g task-tracker
```

## Usage

### Add a Task

```bash
task-tracker add "Task description"
```

Adds a new task to your todo list.

**Example:**

```bash
task-tracker add "Buy groceries"
```

**Output:**

```
Buy groceries Added successfully in Todo list ID: 1
```

### Update a Task

```bash
task-tracker update <id> "Updated description"
```

Updates the description of an existing task.

**Example:**

```bash
task-tracker update 1 "Buy groceries and cook dinner"
```

**Output:**

```
Todo updated successfully
```

### Delete a Task

```bash
task-tracker delete <id>
```

Removes a task from the list. IDs will be reindexed automatically.

**Example:**

```bash
task-tracker delete 1
```

**Output:**

```
Todo ID: 1 deleted successfully
```

### Mark Task as In Progress

```bash
task-tracker mark-in-progress <id>
```

Marks a task as in progress.

**Example:**

```bash
task-tracker mark-in-progress 1
```

**Output:**

```
Todo ID: 1 marked as In Progress
```

### Mark Task as Done

```bash
task-tracker mark-done <id>
```

Marks a task as done.

**Example:**

```bash
task-tracker mark-done 1
```

**Output:**

```
Todo ID: 1 marked as Done
```

### List Tasks

#### List All Tasks

```bash
task-tracker list
```

Lists all tasks.

#### List Done Tasks

```bash
task-tracker list done
```

Lists tasks with "Done" status.

#### List Pending Tasks

```bash
task-tracker list todo
```

Lists tasks with "Pending" status.

#### List In Progress Tasks

```bash
task-tracker list in-progress
```

Lists tasks with "In Progress" status.

## Data Storage

Tasks are stored in `rahul.json` in your working directory. The file is automatically created on first use.
```
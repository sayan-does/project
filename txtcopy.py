import os

def list_code_files_with_content(folder_path, output_file="code_files.txt"):
    """
    Create a text file listing all folders and code files in the specified folder and its subdirectories,
    along with their content.

    Parameters:
    folder_path (str): The path to the folder to search.
    output_file (str): The name of the output text file. Default is 'code_files.txt'.
    """
    # Define the file extensions to search for
    code_extensions = {".py", ".java", ".js", ".cpp", ".c", ".html", ".css", ".php", ".tsx", ".cs", ".rb", ".go"}

    with open(output_file, "w", encoding="utf-8") as f:
        for root, dirs, files in os.walk(folder_path):
            # Write folder name
            f.write(f"Folder: {root}\n")
            f.write("\n")
            
            # Process files in the folder
            for file in files:
                if any(file.endswith(ext) for ext in code_extensions):
                    file_path = os.path.join(root, file)
                    f.write(f"File: {file_path}\n")
                    f.write("Content:\n")
                    try:
                        with open(file_path, "r", encoding="utf-8") as code_file:
                            f.write(code_file.read() + "\n")
                    except Exception as e:
                        f.write(f"Error reading file: {e}\n")
                    f.write("\n" + "-" * 80 + "\n")
            
            # Indicate subfolders
            if dirs:
                f.write("Subfolders:\n")
                for subfolder in dirs:
                    f.write(f"- {os.path.join(root, subfolder)}\n")
                f.write("\n" + "=" * 80 + "\n")

    print(f"List of folders and code files with content saved to {output_file}")

if __name__ == "__main__":
    folder_to_search = input("Enter the folder path to search: ").strip()
    if os.path.isdir(folder_to_search):
        list_code_files_with_content(folder_to_search)
    else:
        print("Invalid folder path. Please try again.")

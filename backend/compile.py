import subprocess
from pathlib import Path


def compile_arduino(project_path: str, board: str):
    project_path = Path(project_path)
    build_path = project_path / "build"

    result = subprocess.run(
        [
            "arduino-cli",
            "compile",
            "--fqbn",
            board,
            "--output-dir",
            str(build_path),
            str(project_path)
        ],
        capture_output=True,
        text=True
    )

    firmware_file = None

    if result.returncode == 0 and build_path.exists():
        files = list(build_path.iterdir())

        for file in files:
            if file.suffix.lower() in [".hex", ".bin"]:
                firmware_file = file
                break

    return {
        "success": result.returncode == 0,
        "stdout": result.stdout,
        "stderr": result.stderr,
        "return_code": result.returncode,
        "firmware_file": firmware_file
    }
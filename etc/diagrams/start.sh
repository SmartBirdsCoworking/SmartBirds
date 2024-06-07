# Description: This script generates the architecture diagram of the project.

#brew install graphviz
python3 -m venv venv
source venv/bin/activate
#pip install -r requirements.txt
pip install --upgrade diagrams
rm -f loyalty_program_architecture.png
python generate_architecture_diagram.py && open loyalty_program_architecture.png
deactivate